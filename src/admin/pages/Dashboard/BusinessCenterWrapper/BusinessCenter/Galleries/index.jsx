import React, { Component } from 'react';
import './style.scss';

import Item from './Item';
import ModalWrapper from '../../../../../components/UI/Modal/';
import Dropzone from '../../../../../components/Dropzone';
import Transform from '../../../../../components/Animation/Translate';

import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { toggleModal, getBusinessData } from '../../../../../ducks/businessProfile';
import { deleteFileAction, resetFiles } from '../../../../../ducks/files';
import { createDeepEqualSelector } from '../../../../../helpers/common';
import { deleteGalleryFile } from '../../../../../ducks/businessProfile';
import { updateGalleryOrder } from '../../../../../ducks/businessCenter';

const SortableItem = SortableElement(({ value, click }) => <Item item={value} click={click} />);

const SortableList = SortableContainer(({ items, click }) => {
    return (
        <div className="sortable-wrapper">
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={value}
                    disabled={value.storageUrl === 'addPhoto'}
                    click={() => click(value.id, index)}
                />
            ))}
        </div>
    );
});

class Gallery extends Component {
    state = {
        items: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.items.length !== nextProps.photos.length) {
            return {
                items: nextProps.photos
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    onSortEnd = ({ oldIndex, newIndex }, e) => {
        const { dispatch } = this.props;
        const id = this.state.items[oldIndex].id;

        dispatch(updateGalleryOrder(id, newIndex));

        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };

    handleGetData = () => {
        const {
            dispatch,
            match: { params }
        } = this.props;

        dispatch(getBusinessData(params.businessId));
    };

    handleHideModal = (e, shouldDelete = false) => {
        const { dispatch } = this.props;
        if (shouldDelete) {
            dispatch(deleteFileAction(null, null, true)).then(() => {
                this.handleGetData();
            });
        } else {
            this.handleGetData();
        }
        dispatch(toggleModal(false));
        dispatch(resetFiles());
    };

    handleCancelSort = (e) => {
        if (e.target.className === 'icon-cancel') {
            return true;
        }
        return false;
    };

    handleRemovePhoto = async (id, index) => {
        const {
            dispatch,
            match: { params }
        } = this.props;

        const res = await dispatch(deleteGalleryFile(id));
        if (res) {
            dispatch(getBusinessData(params.businessId));

            const updArr = [...this.state.items];
            updArr.splice(index, 1);
            this.setState({ items: updArr });
        }
    };

    render() {
        const { items } = this.state;
        const { showModal, data } = this.props;
        return (
            <div id="galleries" class="businessInfoPanel">
                <div class="galleriesSection">
                    <div class="panelTextArea">
                        <h3>Photo Gallery</h3>
                        <div class="galleryContentArea">
                            <p>
                                <i class="fa fa-arrows" aria-hidden="true" /> Drag and drop to
                                change the order of your photos.
                            </p>
                            <p>
                                <i class="fa fa-picture-o" aria-hidden="true" /> To set Change, edit
                                or feature a photo click on the icon below. This image will appear
                                in search results within 24 hours.
                            </p>
                        </div>
                        <SortableList
                            items={items}
                            onSortEnd={this.onSortEnd}
                            axis="xy"
                            shouldCancelStart={this.handleCancelSort}
                            click={(id, index) => this.handleRemovePhoto(id, index)}
                        />
                        <div class="submitButtonArea">
                            <button
                                type="submit"
                                class="btn btn-primary"
                                onClick={() => alert('Your changes were successfully saved')}
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                </div>
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
                                    <h4 className="modal-title">Upload new images</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="box">
                                        <div className="content">
                                            <div className="error" />
                                            <div className="form uploadImg">
                                                <p>
                                                    Share your experience by uploading photos for
                                                    &nbsp;
                                                    <span>{data.listingTitle || data.name}</span>
                                                </p>
                                                <p className="note">
                                                    <i>Images must have a maximum size of 1mb.</i>
                                                </p>
                                                <p className="note">
                                                    <i>You can upload up to 10 photos.</i>
                                                </p>
                                                <Dropzone
                                                    id={data.id}
                                                    maxFileSize={1048576}
                                                    fileLimit={10}
                                                    withCrop
                                                    type="gallery"
                                                />
                                                <div className="form-group text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={(e) =>
                                                            this.handleHideModal(e, false)
                                                        }
                                                    >
                                                        Done
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
            </div>
        );
    }
}

const getGallery = ({ gallery }) => gallery;

const getGallerySelector = createDeepEqualSelector(getGallery, (photos) => {
    const updPhotos = [...photos];
    updPhotos.push({ storageUrl: 'addPhoto' });

    return updPhotos;
});

const mapStateToProps = (state) => ({
    data: state.businessProfile.business,
    showModal: state.businessProfile.showModal,
    photos: state.businessProfile.business ? getGallerySelector(state.businessProfile.business) : []
});

export default connect(mapStateToProps)(Gallery);
