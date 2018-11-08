import React, { Component } from 'react';

import LoginBtn from './LoginBtn';
import NavbarHeader from './NavbarHeader';
import NavbarMobile from './NavbarMobile';
import Nav from './Nav';
import NavbarAuth from './NavbarAuth';

import { connect } from 'react-redux';
import { showModalAction } from '../../ducks/auth';
import { withRouter } from 'react-router-dom';
import { moveToTop, fixedHeader } from '../../helpers/common';
import { resetSearch } from '../../ducks/explore';
import { resetAll } from '../../ducks/addBusiness';
import { initialize, change } from 'redux-form';

class Header extends Component {
    constructor() {
        super();
        this.navBarRef = React.createRef();
    }

    componentDidMount = () => {
        fixedHeader();
    };

    handleSlideIn = () => {
        const el = this.navBarRef.current;
        el.classList.add('slide');
    };

    handleSlideOut = () => {
        const el = this.navBarRef.current;
        el.classList.remove('slide');
    };

    handleNavWrapperClassName = () => {
        const { pathname } = this.props.location;
        switch (pathname) {
            case '/':
                return;
            default:
                return 'navbarWhite';
        }
    };

    handleClick = (e) => {
        const { dispatch, userData } = this.props;
        e.persist();
        moveToTop();
        this.handleSlideOut();
        switch (e.target.innerText) {
            case 'CATEGORY':
            case 'EXPLORE':
                dispatch(resetSearch());
                $('.search.dropdown.category').dropdown('clear');
                $('.search.dropdown.category').dropdown('restore placeholder text');
                $('.search.dropdown.area').dropdown('clear');
                $('.search.dropdown.area').dropdown('restore placeholder text');
                $('.ui.dropdown.filter2').dropdown('clear');
                $('.ui.dropdown.filter2').dropdown('restore default text');
                break;
            case 'HOME':
                dispatch(resetSearch());
                $('.ui.dropdown.main').dropdown('restore placeholder text');
                break;
            case 'ADD BUSINESS':
                dispatch(resetAll());
                dispatch(initialize('addBusiness', addBusinessInitialData));
                dispatch(change('addBusiness', 'email', userData.email));
                $('.search.dropdown.area').dropdown('clear');
                $('.search.dropdown.area').dropdown('restore default text');
                $('.search.dropdown.city').dropdown('clear');
                $('.search.dropdown.city').dropdown('restore default text');
                break;
        }
    };

    handleNavClassName = () => {
        const { pathname } = this.props.location;
        switch (pathname) {
            case '/':
                return 'transparent-navbar';
            default:
                return 'lightHeader';
        }
    };

    handleLogoRender = () => {
        const { pathname } = this.props.location;
        switch (pathname) {
            case '/':
                return '/img/searfilogofo.svg';
            default:
                return '/img/searfilogo.svg';
        }
    };

    render() {
        const { userData, isAuth, dispatch } = this.props;
        return (
            <header id="pageTop" className="header">
                <div className={`nav-wrapper ${this.handleNavWrapperClassName()}`}>
                    <nav
                        id="menuBar"
                        className={`navbar navbar-default ${this.handleNavClassName()}`}
                        role="navigation"
                    >
                        <div className="container">
                            <NavbarHeader
                                click={this.handleSlideIn}
                                logoRender={this.handleLogoRender}
                                logoClick={this.handleClick}
                            />
                            <div
                                className={`navbar-collapse ${isAuth ? 'logged-in' : ''}`}
                                ref={this.navBarRef}
                            >
                                <div
                                    className="slide-close visible-xs"
                                    onClick={this.handleSlideOut}
                                >
                                    <i className="demo-icon icon-cancel" />
                                </div>
                                <ul className="nav header-nav navbar-nav navbar-right">
                                    {isAuth && (
                                        <NavbarMobile
                                            dispatch={dispatch}
                                            userData={userData}
                                            click={this.handleClick}
                                        />
                                    )}
                                    <Nav click={this.handleClick} />
                                    {isAuth && (
                                        <NavbarAuth
                                            dispatch={dispatch}
                                            userData={userData}
                                            click={this.handleClick}
                                        />
                                    )}
                                </ul>
                            </div>
                            {!isAuth && <LoginBtn showModal={() => dispatch(showModalAction())} />}
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    userData: auth.userData,
    isAuth: auth.isAuth,
    showModal: auth.showModal
});

export default withRouter(connect(mapStateToProps)(Header));
