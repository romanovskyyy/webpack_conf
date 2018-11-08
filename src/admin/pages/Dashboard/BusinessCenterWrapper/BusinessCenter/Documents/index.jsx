import React, { Component } from 'react';
import './style.scss';

import Modal from './Modal';
import FileItem from './Modal/Dropzone/FileItem';

import { connect } from 'react-redux';
import { toggleModal, deleteDocument } from '../../../../../ducks/businessProfile';

class Documents extends Component {
    render() {
        const {
            dispatch,
            showModal,
            data,
            match: { params }
        } = this.props;

        return (
            <div id="document" className="businessInfoPanel">
                <div className="documentSection">
                    <div className="panelTextArea">
                        <h3>Documents</h3>
                        <div className="documentContentArea">
                            <p>
                                <i className="fa fa-arrows" aria-hidden="true" /> Documents will be
                                moderated before publishing, typically around 48 hours. We will be
                                in touch to let you know if your documents have been published.
                            </p>
                        </div>
                        <div className="row thumb-wrapper">
                            {data.files.map((file) => (
                                <div className="col-sm-3 col-xs-6 thumb" key={file.id}>
                                    <FileItem
                                        file={file}
                                        click={() => dispatch(deleteDocument(file.id))}
                                    />
                                </div>
                            ))}
                            <div className="col-sm-3 col-xs-6 thumb">
                                <a className="addPhoto" onClick={() => dispatch(toggleModal(true))}>
                                    <span>
                                        <i className="fa fa-plus-square-o" aria-hidden="true" />
                                    </span>{' '}
                                    Add Documents
                                </a>
                            </div>
                        </div>
                        <div className="submitButtonArea">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={() => alert('Your changes were successfully saved')}
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    showModal={showModal}
                    dispatch={dispatch}
                    linkId={params.businessId}
                    id={data.id}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.businessProfile.business,
    showModal: state.businessProfile.showModal
});

export default connect(mapStateToProps)(Documents);
