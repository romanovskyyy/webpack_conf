import React from 'react';

const Gallery = () => {
    return (
        <section className="clearfix populer-city-section">
            <div className="container">
                <div className="page-header text-center">
                    <h2>
                        Popular Cities <small>explore listings in popular cities</small>
                    </h2>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-xs-12">
                        <a href="#" className="img-box">
                            <img
                                src="/img/populer-city/architecture-1545276%20copy%204.png"
                                alt="Image"
                            />
                            <div className="content">
                                <h3>Abu Dhabi</h3>
                            </div>
                        </a>
                    </div>
                    <div className="col-sm-8 col-xs-12">
                        <a href="#" className="img-box img-responsive">
                            <img
                                className="center-block"
                                src="/img/burj-al-arab-2624317.png"
                                alt="Image"
                            />
                            <div className="content">
                                <h3>Dubai</h3>
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <a href="#" className="img-box img-responsive">
                            <img src="/img/populer-city/14418944501_5588d1553c_o.png" alt="Image" />
                            <div className="content">
                                <h3>Sharjah</h3>
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <a href="#" className="img-box">
                            <img src="/img/populer-city/old-fort-2280457.png" alt="Image" />
                            <div className="content">
                                <h3>Al Ain</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
