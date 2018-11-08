import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

class DashboardHeader extends Component {
    componentDidUpdate = (prevProps) => {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            $('.dropdownRef').removeClass('open');
        }
    };

    componentDidMount = () => {
        if ($('.navbar').width() > 1007) {
            $('.nav .dropdown').hover(
                function() {
                    $(this).addClass('open');
                },
                function() {
                    $(this).removeClass('open');
                }
            );
        }
        $('.navbar-dash .fa').bind('click', function() {
            $('.navbar-dash .navbar-nav li').toggleClass('display');
            $(this).toggleClass('fa-angle-down');
            $(this).addClass('fa-angle-up');
        });

        $('.dropdown-toggle').bind('click', () => {
            $('.dropdownRef').toggleClass('open');
        });

        if (window.innerWidth < 740) {
            $('.menu-icon').bind('click', function() {
                $('.editMainSection .leftPanel').css('left', '0px');
                $('.navbar-toggle').hide();
                $('.leftPanel').removeClass('hide');
            });
            $('.leftPanel .slide-close').bind('click', function() {
                $('.editMainSection .leftPanel').css('left', '-250px');
                $('.navbar-toggle').show();
            });
            $(
                '.details, .location, .categories, .reviews, .galleries, .document, .videos, .products, .promotions, .bills'
            ).bind('click', function() {
                $('.leftPanel').addClass('hide');
                $('.navbar-toggle').show();
            });
        }
    };

    componentWillUnmount = () => {
        $('.navbar-dash .fa').unbind();
        $('.dropdown-toggle').unbind();
        $('.nav .dropdown').unbind();
        $('.menu-icon').unbind();
        $('.nav .dropdown .dropdown-menu a').unbind();
        $('.leftPanel .slide-close').unbind();
        $(
            '.details, .location, .categories, .reviews, .galleries, .document, .videos, .products, .promotions, .bills'
        ).unbind();
    };

    render() {
        const { pathname } = this.props.location;
        const isOnList = pathname === '/business-center';
        return (
            <section className="navbar-dashboard-area">
                <nav
                    className="navbar navbar-default lightHeader navbar-dashboard"
                    role="navigation"
                >
                    <div className="container">
                        <div className="navbar-dash">
                            <ul className="nav navbar-nav">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-tachometer" aria-hidden="true" />{' '}
                                        Dashboard
                                    </a>{' '}
                                    <span
                                        className="fa fa-angle-down visible-xs"
                                        aria-hidden="true"
                                    />
                                </li>
                                <li className="dropdown dropdownRef">
                                    <a href="#" className="dropdown-toggle" role="button">
                                        <i className="fa fa-list-ul" aria-hidden="true" />
                                        {isOnList ? ' My Businesses' : ' Business Center'}
                                        <i className="fa fa-angle-down" aria-hidden="true" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-left">
                                        <li>
                                            <a href="#">Add Branch</a>
                                        </li>
                                        <li>
                                            <Link to="/add-business">Add Business</Link>
                                        </li>
                                        {!isOnList && (
                                            <li>
                                                <Link to="/business-center">My Businesses</Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-envelope" aria-hidden="true" /> Messages
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-user" aria-hidden="true" /> Personal
                                        Details
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-bell" aria-hidden="true" /> Notification
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}

export default withRouter(DashboardHeader);
