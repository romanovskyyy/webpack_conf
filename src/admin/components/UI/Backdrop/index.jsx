import React from 'react';
import './style.scss';

const Backdrop = ({ click }) => {
    return <div className="modal_backdrop" onClick={click} />;
};

export default Backdrop;
