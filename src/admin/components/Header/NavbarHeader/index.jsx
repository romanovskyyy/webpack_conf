import React from 'react';

import { Link } from 'react-router-dom';

const NavbarHeader = ({ click, logoRender, logoClick }) => {
    return (
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={click} data-toggle="collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </button>
            <Link onClick={logoClick} className="navbar-brand" to="/">
                <img className="image-replace" src={logoRender()} alt="Searfi" />
            </Link>
        </div>
    );
};

export default NavbarHeader;
