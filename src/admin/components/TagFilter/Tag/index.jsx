import React from 'react';

const Tag = ({ val, label, color }) => {
    return (
        <div className="item" data-value={val}>
            <div className={`ui ${color} empty circular label`} />
            {label}
        </div>
    );
};

export default Tag;
