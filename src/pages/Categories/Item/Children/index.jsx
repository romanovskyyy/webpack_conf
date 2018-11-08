import React from 'react';

const Children = ({ item: { name }, click }) => {
    return (
        <div className="item">
            <div className="content">
                <a className="header" onClick={click}>
                    {name}
                </a>
            </div>
        </div>
    );
};

export default Children;
