import React from 'react';

const Tag = ({ text, icon }) => {
    return (
        <div className="item">
            <i className={`${icon} icon`} />
            <div className="content">
                <div className="header">{text}</div>
            </div>
        </div>
    );
};

export default Tag;
