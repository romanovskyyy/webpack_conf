import React, { Component } from 'react';
import './style.scss';
import '../../../helpers/blob.js';

import AvatarEditor from 'react-avatar-editor';

import { updateAvatarPreview, updateAvatarFile } from '../../../ducks/editUser';

class FileUpload extends Component {
    state = {
        showEditor: false,
        file: null,
        preview: null,
        scale: 1.2
    };

    handleUploadFile = (e) => {
        const file = e.target.files[0];

        this.setState({ file, showEditor: true });
    };

    handleChangeScale = (e) => {
        this.setState({ scale: e.target.value });
    };

    handleUpdAvaPreview = () => {
        const canvas = this.editor.getImageScaledToCanvas();
        const { dispatch } = this.props.meta;
        canvas.toBlob(
            (blob) => {
                this.objectURL = URL.createObjectURL(blob);
                const fd = new FormData();
                fd.append('file', blob, 'filename.jpg');

                dispatch(updateAvatarPreview(this.objectURL, false));
                dispatch(updateAvatarFile(fd));
                this.setState({ showEditor: false });
            },
            'image/jpeg',
            95
        );
    };

    componentWillUnmount = () => {
        window.URL.revokeObjectURL(this.objectURL);
    };

    handleHideCropper = (e) => {
        this.input.value = '';
        if (e.target.classList.contains('avatar_cropper-wrapper')) {
            this.setState({ showEditor: false, file: null });
        }
    };

    setEditorRef = (editor) => (this.editor = editor);

    setInputRef = (input) => (this.input = input);

    render() {
        const { file, scale, showEditor } = this.state;
        return (
            <div className="file-upload profileImageUpload">
                <div className="upload-area">
                    <input
                        ref={this.setInputRef}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        className="file"
                        onChange={this.handleUploadFile}
                    />
                    <button className="browse" type="button">
                        Upload a Picture <i className="fa fa-upload" aria-hidden="true" />
                    </button>
                </div>
                {showEditor && (
                    <div className="avatar_cropper-wrapper" onClick={this.handleHideCropper}>
                        <div className="avatar_cropper">
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={file}
                                width={450}
                                height={450}
                                border={50}
                                color={[0, 0, 0, 0.6]}
                                scale={scale}
                                className="avatar_cropper-canvas"
                                borderRadius={500}
                            />
                            <input
                                type="range"
                                className="avatar_cropper-input"
                                step="0.05"
                                min="1"
                                max="3"
                                name="scale"
                                value={+scale}
                                onChange={this.handleChangeScale}
                            />
                            <button
                                className="avatar_cropper-button"
                                onClick={this.handleUpdAvaPreview}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default FileUpload;
