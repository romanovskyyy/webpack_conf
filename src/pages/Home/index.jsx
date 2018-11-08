import React, { Component } from 'react';

import Banner from './Banner';
import Things from './Things';
import Gallery from './Gallery';
import Works from './Works';
import CallAction from './CallAction';

class Home extends Component {
    render() {
        const { dispatch, isAuth } = this.props;
        return (
            <React.Fragment>
                <Banner />
                <Things />
                <Gallery />
                <Works isAuth={isAuth} dispatch={dispatch} />
                {!isAuth && <CallAction dispatch={dispatch} />}
            </React.Fragment>
        );
    }
}
export default Home;
