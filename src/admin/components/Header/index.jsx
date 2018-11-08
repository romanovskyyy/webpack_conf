import React, { Component } from 'react';

import LoginBtn from './LoginBtn';
import NavbarHeader from './NavbarHeader';
import NavbarMobile from './NavbarMobile';
import Nav from './Nav';
import NavbarAuth from './NavbarAuth';

import { connect } from 'react-redux';
// import { fixedHeader, } from '../../helpers/common';
// import { resetSearch } from '../../ducks/explore';
// import { resetAll } from '../../ducks/addBusiness';
// import { initialize, change } from 'redux-form';

class Header extends Component {
    constructor() {
        super();
        this.navBarRef = React.createRef();
    }

    handleSlideIn = () => {
        const el = this.navBarRef.current;
        el.classList.add('slide');
    };

    handleSlideOut = () => {
        const el = this.navBarRef.current;
        el.classList.remove('slide');
    };

    handleLogoRender = () => {
        return '/img/searfilogo.svg';
    };

    render() {
        const { dispatch } = this.props;
        return (
            <header id="pageTop" className="header">
                <div className={`nav-wrapper navbarWhite`}>
                    <nav
                        id="menuBar"
                        className={`navbar navbar-default lightHeader`}
                        role="navigation"
                    >
                        <div className="container">
                            <NavbarHeader
                                click={this.handleSlideIn}
                                logoRender={this.handleLogoRender}
                                logoClick={this.handleClick}
                            />
                            <div className={`navbar-collapse logged-in`} ref={this.navBarRef}>
                                <div
                                    className="slide-close visible-xs"
                                    onClick={this.handleSlideOut}
                                >
                                    <i className="demo-icon icon-cancel" />
                                </div>
                                <ul className="nav header-nav navbar-nav navbar-right">
                                    <NavbarMobile dispatch={dispatch} click={this.handleClick} />
                                    <Nav click={this.handleClick} />
                                    <NavbarAuth dispatch={dispatch} click={this.handleClick} />
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Header);
