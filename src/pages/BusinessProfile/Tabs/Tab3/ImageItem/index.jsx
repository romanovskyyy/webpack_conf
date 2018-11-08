import React from 'react';
import './style.scss';

const ImageItem = ({ photo, onClick, index }) => {
    return (
        <div className="col-sm-2 col-xs-6 thumb">
            <a className="thumbnail">
                <img
                    className="img-thumbnail"
                    src="img/listing/Jotun3.jpg"
                    {...photo}
                    alt="Another alt text"
                    onClick={(e) => onClick(e, { index, photo })}
                />
            </a>
        </div>
    );
};

export default ImageItem;
