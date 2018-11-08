import React from 'react';

const Item = ({ item }) => {
    return (
        <div className="item" data-value={item.value}>
            {item.label}
        </div>
    );
};

export default Item;
