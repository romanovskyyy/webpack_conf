import React from 'react';

const Tab2 = ({ active, click }) => {
    return (
        <div className={`tabs ${active ? 'active' : ''}`}>
            <div className="row">
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/02.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Customizes business profile</h3>
                            </a>
                            <p>
                                Searfi offers a customizes business profile online to market your
                                business with security, storage and your dedicated URL path which
                                includes your business name. Searfi offers 1 attractive
                                all-inclusive package for all businesses.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/03.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Create business profile</h3>
                            </a>
                            <p>
                                Searfi enables the business to create their profile with an
                                easy-to-use form-based interface which fills a profile individually
                                for all platform optimized at once. Searfi is optimized to support
                                all these attributes from day 1.{' '}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/06.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Increase businesses revenue</h3>
                            </a>
                            <p>
                                Searfi allows businesses to increase their revenue without taking a
                                share. Therefore the business can concentrate in attracting more
                                customers and providing best services to gain profit and positive
                                ratings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="btnArea text-center register-button">
                        <a href="#" className="btn btn-primary" onClick={click}>
                            Register your Business
                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tab2;
