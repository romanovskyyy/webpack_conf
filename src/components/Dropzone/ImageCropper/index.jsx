import React, { Component } from 'react';
import './style.scss';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { fetchFilesAction, toggleShowCropper, resetCropFiles } from '../../../ducks/files';
import { escKeyDown } from '../../../helpers/common';

export default class ImageCropper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: 0
        };
        this.closeBtnRef = React.createRef();
    }

    fd = new FormData();

    componentWillMount = () => {
        const { id, type } = this.props;
        this.fd.append('type', type);
        this.fd.append('id', id);
    };

    handleClick = () => {
        const { currentFile } = this.state;
        const { files } = this.props;

        this.cropper.getCroppedCanvas().toBlob((blob) => {
            this.fd.append('file', blob, 'filename.jpg');
            if (files.length - 1 === currentFile) {
                this.handleFetchData();
                return;
            }
        });
        this.setState(({ currentFile }) => ({ currentFile: currentFile + 1 }));
    };

    handleFetchData = () => {
        const { dispatch } = this.props;
        dispatch(fetchFilesAction(this.fd));
        this.handleHideCropper();
        this.fd.delete('file');
    };

    handleHideCropper = () => {
        const { dispatch } = this.props;

        dispatch(toggleShowCropper(false));
        dispatch(resetCropFiles());
    };

    componentDidMount = () => {
        setTimeout(() => this.closeBtnRef.current.focus(), 10);
    };

    render() {
        const { files } = this.props;
        const { currentFile } = this.state;
        const isLast = files.length - 1 === currentFile;
        return (
            <div className="crop-modal">
                <Cropper
                    ref={(cropper) => {
                        this.cropper = cropper;
                    }}
                    src={files.length > 0 && files[currentFile] ? files[currentFile].preview : ''}
                    style={{ height: 400, width: '100%', marginBottom: '30px' }}
                    guides={false}
                    background={false}
                    modal={true}
                    viewMode={1}
                    movable={false}
                    zoomable={false}
                    aspectRatio={16 / 9}
                    autoCropArea={1}
                />

                <button
                    type="button"
                    className="close"
                    onKeyDown={(e) => escKeyDown(e, this.handleHideCropper)}
                    ref={this.closeBtnRef}
                    onClick={this.handleHideCropper}
                    tabIndex="1"
                    autoFocus
                >
                    &times;
                </button>

                <button type="button" className="avatar_cropper-button" onClick={this.handleClick}>
                    {isLast ? 'Save' : 'Next'}
                </button>
            </div>
        );
    }
}
