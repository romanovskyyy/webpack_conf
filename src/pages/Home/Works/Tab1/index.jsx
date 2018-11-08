import React from 'react';

const Tab1 = ({ active }) => {
    return (
        <div className={`tabs ${active ? 'active' : ''}`}>
            <div className="row">
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/05.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Find the desired product or service</h3>
                            </a>
                            <p>
                                Studies have shown that customers are researching online before
                                purchasing either online and also before visiting retail stores.
                                Searfi helps to find the desired product or service they are looking
                                for.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/04.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Supports online and offline shopping</h3>
                            </a>
                            <p>
                                Searfi supports online and offline shopping and is therefore the
                                ideal omnichannel platform for retail and service offers. Searfi is
                                not limited to any category, product, service nor business type.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                    <div className="thumbnail text-center worksContent">
                        <img src="/img/01.png" alt="Image works" />
                        <div className="caption">
                            <a href="#">
                                <h3>Save time driving</h3>
                            </a>
                            <p>
                                Searfi will save time driving from one business location to the next
                                by offering clear directions and GPS locations of the businesses
                                listed. Searfi will save also time to customers searching for
                                specific products and services online by merging the multiple
                                channels currently availble.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tab1;
