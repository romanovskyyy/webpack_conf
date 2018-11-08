import React, { Component } from 'react';

import Transform from '../../../../../../components/Animation/Translate';
import ModalWrapper from '../../../../../../components/UI/Modal/';
import Dropzone from './Dropzone';
import { fetchFilesAction, resetFiles } from '../../../../../../ducks/files';
import { getBusinessData, toggleModal } from '../../../../../../ducks/businessProfile';

const initialState = {
    title: { value: '', touched: false, valid: false },
    description: { value: '', touched: false, valid: false },
    accepted: [],
    rejected: [],
    isSubmitting: false,
    wasSubmitted: false
};
export default class Modal extends Component {
    state = {
        ...initialState
    };

    onDrop = (accepted, rejected) => {
        const { acceptedFiles, fileLimit } = this.props;

        let updAcceptedArr = accepted;
        let updRejectedArr = rejected;

        if (fileLimit) {
            const avaibleUploadFilesCount = fileLimit - acceptedFiles.length;

            updAcceptedArr = [...accepted].slice(0, avaibleUploadFilesCount);
            updRejectedArr = [...accepted].slice(avaibleUploadFilesCount).concat(rejected);
        }

        this.setState(({ accepted, rejected }) => ({
            accepted: [...accepted, ...updAcceptedArr],
            rejected: [...rejected, ...updRejectedArr]
        }));
    };

    handleSave = () => {
        const { id, dispatch } = this.props;
        const { title, description, accepted } = this.state;
        if (!accepted.length || !title.value || !description.value) {
            return this.setState((prevState) => ({
                title: { ...prevState.title, touched: true },
                description: { ...prevState.description, touched: true },
                wasSubmitted: true
            }));
        }
        this.setState({ isSubmitting: true });

        const fd = new FormData();
        fd.append('id', id);
        fd.append('title', title);
        fd.append('description', description);

        accepted.forEach((file) => {
            fd.append('file', file);
        });

        dispatch(fetchFilesAction(fd)).then(() => {
            this.handleHideModal(null, true);
            this.handleGetData();
            this.setState({ isSubmitting: false });
        });
    };

    handleDeleteFile = (index, type) => {
        const updArr = [...this.state[type]];
        updArr.splice(index, 1);
        this.setState({ [type]: updArr });
    };

    handleGetData = () => {
        const { dispatch, linkId } = this.props;

        dispatch(getBusinessData(linkId));
    };

    handleHideModal = (e, shouldDeleteFiles = false) => {
        this.setState({ isSubmitting: false });
        if (shouldDeleteFiles) {
            this.setState({ ...initialState });
        }
        this.props.dispatch(toggleModal(false));
    };

    handleChange = ({ target: { name, value } }) =>
        this.setState({
            [name]: {
                value,
                touched: true,
                valid: this.handleValidate(value)
            }
        });

    handleValidate = (value) => (value ? true : false);

    componentWillUnmount = () => {
        this.props.dispatch(resetFiles());
    };

    render() {
        const { showModal } = this.props;
        const { accepted, rejected, title, description, isSubmitting, wasSubmitted } = this.state;
        const shouldDisable =
            (title.touched && !title.valid) ||
            (description.touched && !description.valid) ||
            (!accepted.length && wasSubmitted) ||
            isSubmitting;
        const descriptionLength = description && description.value ? description.value.length : 0;
        return (
            <Transform in={showModal}>
                <ModalWrapper click={(e) => this.handleHideModal(e, true)} show={showModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={(e) => this.handleHideModal(e, true)}
                                >
                                    &times;
                                </button>
                                <h4 className="modal-title">Add a new document</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box">
                                    <div className="content">
                                        <div className="error" />
                                        <div className="form loginBox">
                                            <Dropzone
                                                handleDrop={this.onDrop}
                                                acceptedFiles={accepted}
                                                rejectedFiles={rejected}
                                                click={this.handleDeleteFile}
                                            />
                                            {!accepted.length &&
                                                wasSubmitted && (
                                                    <span className="error">Required</span>
                                                )}
                                            <div
                                                className={`form-group ${
                                                    title.touched && !title.valid ? 'error' : ''
                                                }`}
                                            >
                                                <label for="UserNameProfile">Document title</label>
                                                <input
                                                    onChange={this.handleChange}
                                                    name="title"
                                                    type="text"
                                                    className="form-control"
                                                    id="UserNameProfile"
                                                    placeholder="Enter Document title"
                                                    value={title.value}
                                                />
                                                {title.touched &&
                                                    !title.valid && (
                                                        <span className="error">Required</span>
                                                    )}
                                            </div>
                                            <div
                                                className={`form-group ${
                                                    description.touched && !description.valid
                                                        ? 'error'
                                                        : ''
                                                }`}
                                            >
                                                <label for="UserNameProfile">Description</label>
                                                <textarea
                                                    onChange={this.handleChange}
                                                    name="description"
                                                    className="form-control"
                                                    rows="5"
                                                    id="listing-text"
                                                    placeholder="Describe the uploaded documents"
                                                    value={description.value}
                                                    maxLength={50}
                                                />
                                                {description.touched &&
                                                    !description.valid && (
                                                        <span className="error">Required</span>
                                                    )}
                                                <span style={{ marginTop: '5px' }}>
                                                    {50 - descriptionLength}
                                                    &nbsp;Characters left
                                                </span>
                                            </div>
                                            <div className="documentContentArea">
                                                <p>
                                                    <i
                                                        className="fa fa-clock-o"
                                                        aria-hidden="true"
                                                    />
                                                    Your documents will be reviewed and validated
                                                    before publishing your profile, typically within
                                                    24-48hrs. You will receive a notification email
                                                    when it has been published.
                                                </p>
                                            </div>
                                            <div className="form-group text-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={this.handleSave}
                                                    disabled={shouldDisable}
                                                >
                                                    Save &amp; Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalWrapper>
            </Transform>
        );
    }
}
