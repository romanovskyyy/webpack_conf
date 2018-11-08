import React from 'react';
import Link from './Link';

const Header = ({ data }) => {
    return (
        <div className="detailsInfoBox">
            <div className="detailsInfoBox-link">
                <div className="row">
                    <Link icon="fa fa-star" text="Write a review" disabled />
                    <Link icon="heart icon" text="Add to favorites" disabled />
                    <Link icon="fa fa-share" text="Share" />
                </div>
            </div>
            <p>{data.description}</p>
        </div>
    );
};

export default Header;
