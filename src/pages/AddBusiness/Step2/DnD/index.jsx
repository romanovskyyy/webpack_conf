import React, { Component } from 'react';
import './style.scss';

import Dropzone from 'react-dropzone';
import FileItem from '../../../../components/Dropzone/FileItem';

import {
    fetchFilesAction,
    deleteFileAction,
    setRejectedFiles,
    deleteRejectedFile
} from '../../../../ducks/files';
import { Element } from 'react-scroll';

export default class DnD extends Component {
    constructor(props) {
        super(props);
        this.dropzoneRef = React.createRef();
        this.state = {
            rejected: []
        };
    }
    onDrop = (acceptedFiles, rejectedFiles) => {
        const { dispatch } = this.props.meta;

        const fd = new FormData();

        if (rejectedFiles.length) {
            dispatch(setRejectedFiles(rejectedFiles));
        }
        if (acceptedFiles.length) {
            acceptedFiles.forEach((file) => {
                fd.append('file', file);
            });
            dispatch(fetchFilesAction(fd, true));
        }
    };

    openFilesModal = () => {
        this.dropzoneRef.current.open();
    };
    render() {
        const { meta, input, acceptedFiles, rejectedFiles } = this.props;

        return (
            <div className="col-sm-12">
                <div
                    className={`support-document-area ${meta.error && meta.touched && 'error'}`}
                    title="File"
                >
                    {input.name && <Element name={`position-${input.name}`} />}
                    <p>Optional</p>
                    <h3>Supporting Documents</h3>
                    <p>
                        You are able to upload following files : Images, Pdf, Word, Excel, Pages,
                        Csv
                    </p>
                    <div className="document-upload">
                        <div className="form-group inputDnD">
                            <Dropzone
                                ref={this.dropzoneRef}
                                onDrop={this.onDrop}
                                maxSize={10485760}
                                accept="image/*, .doc, .gif, .pdf, .xls, .rtf, .pages, .xlsx, .xslm, .xlsb, .csv, .docx, .xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="form-control-file font-weight-bold"
                            >
                                <label>Drag and drop files</label>
                            </Dropzone>
                        </div>
                        <div className="form-group">
                            <div className="upload-btn-wrapper">
                                <button
                                    onClick={this.openFilesModal}
                                    type="button"
                                    className="btn-upload"
                                >
                                    Select files
                                </button>
                            </div>
                        </div>
                        {(acceptedFiles.length > 0 || rejectedFiles.length > 0) && (
                            <div className="file-thumbnail-wrapper">
                                {acceptedFiles.map((file, index) => (
                                    <FileItem
                                        key={file.id}
                                        file={file}
                                        index={index}
                                        click={() =>
                                            meta.dispatch(
                                                deleteFileAction(index, file.id, false, true)
                                            )
                                        }
                                    />
                                ))}
                                {rejectedFiles.map((file, index) => (
                                    <FileItem
                                        key={index}
                                        file={file}
                                        rejected
                                        index={index}
                                        click={() => meta.dispatch(deleteRejectedFile(index))}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {meta.error &&
                    meta.touched && (
                        <span className="error">
                            {input.name} {meta.error}
                        </span>
                    )}
            </div>
        );
    }
}
