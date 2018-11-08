import React, { Component } from 'react';
import Carousel from './Carousel';

class Things extends Component {
    render() {
        return (
            <section className="clearfix thingsArea">
                <div className="container">
                    <div className="page-header text-center">
                        <h2>
                            Popular Things Near You <small>explore the most popular listings</small>
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <Carousel />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Things;
