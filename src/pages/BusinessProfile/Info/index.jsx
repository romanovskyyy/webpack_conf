import React from 'react';
import './style.scss';

import Labels from './Labels';
import Header from './Header';
import Details from './Details';

const Info = ({ data, linkId, showModal }) => {
    return (
        <section className="clearfix paddingAdjustTop profile-section">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-xs-12">
                        <div className="listDetailsInfo">
                            <Header data={data} showModal={showModal} />
                            <Labels data={data} />
                        </div>
                    </div>
                    <Details data={data} linkId={linkId} />
                </div>
            </div>
        </section>
    );
};

export default Info;
