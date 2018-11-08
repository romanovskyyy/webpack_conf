import React from 'react';

const TopCategory = ({ category, click }) => {
    return (
        <a onClick={click} style={{ cursor: 'pointer' }}>
            <span className="cat__icon">
                <i className="demo-icon icon-cutlery" />
            </span>
            <span className="cat__text">{category.name}</span>
        </a>
    );
};

export default TopCategory;
