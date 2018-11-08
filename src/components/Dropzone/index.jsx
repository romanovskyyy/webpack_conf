import React, { Component } from 'react';
import './style.scss';

import Dropzone from 'react-dropzone';
import FileItem from './FileItem';
import Transform from '../../components/Animation/Translate/';
import ImageCropper from './ImageCropper';

import {
    resetFiles,
    setForCropFiles,
    toggleShowCropper,
    setRejectedFiles,
    deleteRejectedFile,
    setAcceptedFiles,
    fetchFilesAction
} from '../../ducks/files';
import { deleteFileAction } from '../../ducks/files';
import { deleteCoverPhoto, deleteDocument } from '../../ducks/businessProfile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change } from 'redux-form';

class DropzoneWrapper extends Component {
    onDrop = (accepted, rejected) => {
        const {
            savedFiles = [],
            acceptedFiles,
            dispatch,
            fileLimit,
            withCrop = false,
            type,
            id,
            titleVal,
            descriptionVal
        } = this.props;

        let updAcceptedArr = accepted;
        let updRejectedArr = rejected;

        if (fileLimit) {
            const avaibleUploadFilesCount = fileLimit - acceptedFiles.length - savedFiles.length;

            updAcceptedArr = [...accepted].slice(0, avaibleUploadFilesCount);
            updRejectedArr = [...accepted].slice(avaibleUploadFilesCount).concat(rejected);
        }

        if (updAcceptedArr.length && withCrop) {
            dispatch(setForCropFiles(updAcceptedArr));
            dispatch(toggleShowCropper(true));
        } else {
            dispatch(setAcceptedFiles(updAcceptedArr));
        }
        if (updRejectedArr.length) {
            dispatch(setRejectedFiles(updRejectedArr));
        }
    };

    handleClearReduxFormValue = (fileId) => {
        const { dispatch, logoId, previewId } = this.props;
        if (logoId === fileId) {
            dispatch(change('businessCenter', 'logoId', ''));
        }
        if (previewId === fileId) {
            dispatch(change('businessCenter', 'previewId', ''));
        }
    };

    handleFunc = (id) => {
        const { dispatch } = this.props;

        dispatch(deleteCoverPhoto(id));
        this.handleClearReduxFormValue(id);
    };

    componentWillUnmount = () => {
        this.props.dispatch(resetFiles());
    };

    render() {
        const {
            savedFiles = [],
            acceptedFiles,
            dispatch,
            id,
            showCropper,
            forCropFiles,
            rejectedFiles,
            maxFileSize,
            fileLimit,
            withCrop,
            choosable = false,
            type,
            acceptFileType = 'image/*',
            multiple = true
        } = this.props;

        return (
            <React.Fragment>
                <div className="form-group inputDnD">
                    <label className="sr-only" htmlFor="inputFile">
                        File Upload
                    </label>
                    <Dropzone
                        ref={this.dropzoneRef}
                        onDrop={this.onDrop}
                        accept={acceptFileType}
                        className="form-control-file font-weight-bold"
                        style={{ marginBottom: '30px' }}
                        maxSize={maxFileSize}
                        multiple={multiple}
                    >
                        <label>Drag and drop files</label>
                    </Dropzone>
                    {((savedFiles && savedFiles.length > 0) ||
                        acceptedFiles.length > 0 ||
                        rejectedFiles.length > 0) && (
                        <div className="file-thumbnail-wrapper">
                            {savedFiles.length > 0 &&
                                savedFiles.map((file, index) => (
                                    <FileItem
                                        key={file.id}
                                        file={file}
                                        index={index}
                                        isImg
                                        choosable={choosable}
                                        click={() => this.handleFunc(file.id)}
                                    />
                                ))}
                            {acceptedFiles.length > 0 &&
                                acceptedFiles.map((file, index) => (
                                    <FileItem
                                        key={file.id}
                                        file={file}
                                        index={index}
                                        choosable={choosable}
                                        click={() => {
                                            dispatch(deleteFileAction(index, file.id));
                                            this.handleClearReduxFormValue(file.id);
                                        }}
                                    />
                                ))}
                            {rejectedFiles.length > 0 &&
                                rejectedFiles.map((file, index) => (
                                    <FileItem
                                        key={index}
                                        file={file}
                                        rejected
                                        index={index}
                                        click={() => dispatch(deleteRejectedFile(index))}
                                    />
                                ))}
                        </div>
                    )}

                    {acceptedFiles.length + savedFiles.length > fileLimit && (
                        <span className="error">
                            Total amount of photos should not exceed {fileLimit}
                        </span>
                    )}
                </div>
                {withCrop && (
                    <Transform in={showCropper}>
                        <ImageCropper
                            files={forCropFiles}
                            id={id}
                            dispatch={dispatch}
                            hide={this.handleHideModal}
                            type={type}
                        />
                    </Transform>
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    acceptedFiles: state.files.acceptedFiles,
    rejectedFiles: state.files.rejectedFiles,
    forCropFiles: state.files.forCropFiles,
    showCropper: state.files.showCropper
});

export default withRouter(connect(mapStateToProps)(DropzoneWrapper));
