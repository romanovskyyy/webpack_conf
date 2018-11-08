import React, { Component } from 'react';
import './style.scss';

import Tab1 from './Tab1';
import Tab2 from './Tab2';

import { withRouter } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { showModalAction } from '../../../ducks/auth';
import { moveToTop } from '../../../helpers/common';
class Works extends Component {
    state = {
        activeTab: 1
    };

    scrollTo = () => {
        const { hash } = this.props.location;
        if (hash === '#how_it_works') {
            scroller.scrollTo('worksArea', {
                duration: 800,
                delay: 50,
                offset: -100,
                smooth: 'easeInOutQuart'
            });
        }
    };

    componentDidUpdate = () => {
        this.scrollTo();
    };

    componentDidMount = () => {
        this.scrollTo();
    };

    handleClick = (e) => {
        e.preventDefault();
        const { dispatch, isAuth, history } = this.props;

        if (isAuth) {
            history.push('/add-business');
            moveToTop();
        } else {
            dispatch(showModalAction());
        }
    };

    handleSetActiveTab = (tabNum) => this.setState({ activeTab: tabNum });

    render() {
        const { activeTab } = this.state;
        return (
            <section className="clearfix worksArea">
                <Element name="worksArea" />
                <div className="container">
                    <div className="ui two item secondary pointing menu">
                        <a
                            className={`item ${activeTab === 1 ? 'active' : ''}`}
                            onClick={() => this.handleSetActiveTab(1)}
                        >
                            For Searfi user
                        </a>
                        <a
                            className={`item ${activeTab === 2 ? 'active' : ''}`}
                            onClick={() => this.handleSetActiveTab(2)}
                        >
                            For business owners
                        </a>
                    </div>

                    <div className="page-header text-center">
                        <h2>
                            How it Works? <small>This are some of most popular listing</small>
                        </h2>
                    </div>

                    <div className="main ui container">
                        <Tab1 active={activeTab === 1} />
                        <Tab2 active={activeTab === 2} click={this.handleClick} />
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Works);
