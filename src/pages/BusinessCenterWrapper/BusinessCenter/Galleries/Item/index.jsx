import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { toggleModal } from '../../../../../ducks/businessProfile';

const Item = ({ item: { storageUrl, id }, dispatch, click }) => {
    return (
        <div className="thumb noselect">
            {storageUrl === 'addPhoto' ? (
                <a className="addPhoto" onClick={() => dispatch(toggleModal(true))}>
                    <span>
                        <i className="fa fa-camera" aria-hidden="true" />
                    </span>
                    Add Photos
                </a>
            ) : (
                <a className="thumbnail">
                    <i className="icon-cancel" onClick={click} />
                    <img
                        className="img-thumbnail noselect"
                        src={storageUrl}
                        alt="Another alt text"
                    />
                </a>
            )}
        </div>
    );
};

export default connect()(Item);
