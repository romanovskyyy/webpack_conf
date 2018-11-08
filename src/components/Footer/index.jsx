import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';
import { moveToTop } from '../../helpers/common';
import { withRouter } from 'react-router-dom';

class Footer extends Component {
    render() {
        const {
            isAuth,
            showModal,
            location: { pathname }
        } = this.props;

        const isBusinessCenter = pathname.startsWith('/business-center/');
        if (isBusinessCenter) {
            return null;
        }
        return (
            <footer>
                <div className="clearfix footerInfo">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-xs-12">
                                <div className="footerText">
                                    <Link to="/" className="footerLogo" onClick={moveToTop}>
                                        <img
                                            src="/img/searfilogofo.svg"
                                            alt="Searfi"
                                            title="Business Profile"
                                        />
                                    </Link>
                                    <p className="hidden-xs">
                                        Searfi is an online directory of UAE's local businesses
                                        targeting millions of people living and visiting the UAE
                                        searching for Products, Brands, Locations and Services.
                                        Search results are listed by location so users can easily
                                        find what they’re looking for. Being mobile-friendly makes
                                        search & find easy when on the go. In addition users can
                                        rate and recommend businesses and services, can chat in the
                                        social media section about products and services they are
                                        seeking and can exchange lost & found information. Searfi is
                                        helping local Businesses and Service Providers to publish
                                        their profile and advertise their products and services
                                        online.
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-6">
                                <div className="useLink">
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="#">FAQ</a>
                                        </li>
                                        {!isAuth && (
                                            <li>
                                                <a
                                                    href="javascript: showRegisterForm();"
                                                    className="pointer"
                                                    onClick={showModal}
                                                >
                                                    Create Account
                                                </a>
                                            </li>
                                        )}
                                        {!isAuth && (
                                            <li>
                                                <a
                                                    onClick={showModal}
                                                    href="javascript: showLoginForm();"
                                                    className="pointer"
                                                >
                                                    Login
                                                </a>
                                            </li>
                                        )}
                                        <li>
                                            <a href="#">Newsletter</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-6">
                                <div className="useLink">
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="#">Contact Us</a>
                                        </li>
                                        <li>
                                            <a href="#">Terms and Conditions</a>
                                        </li>
                                        <li>
                                            <Link to="/#how_it_works">How It Works</Link>
                                        </li>
                                        <li>
                                            <a href="#">About Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clearfix copyRight">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="copyRightWrapper">
                                    <div className="row">
                                        <div className="col-sm-5 col-sm-push-7 col-xs-12">
                                            <ul className="list-inline socialLink">
                                                <li>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.facebook.com/Searfi/"
                                                    >
                                                        <i
                                                            className="fa fa-facebook"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://twitter.com/Searfi_uae"
                                                    >
                                                        <i
                                                            className="fa fa-twitter"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.pinterest.com/Searfi_uae/?autologin=true"
                                                    >
                                                        <i
                                                            className="fa fa-pinterest-p"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.linkedin.com/company/searfi/"
                                                    >
                                                        <i
                                                            className="fa fa-linkedin"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-7 col-sm-pull-5 col-xs-12">
                                            <div className="copyRightText">
                                                <p>
                                                    Copyright &copy; 2018. All Rights Reserved by{' '}
                                                    <Link to="/" onClick={moveToTop}>
                                                        Searfi
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default withRouter(Footer);
