import React from 'react';

import { showModalAction } from '../../../ducks/auth';

const CallAction = ({ dispatch }) => {
    return (
        <section className="clearfix callAction">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-sm-9 col-xs-12">
                        <div className="callInfo">
                            <h4>
                                <span>Searfi</span> is the <span>best place to find</span> <br />
                                the needle in the haystack
                            </h4>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3 col-xs-12">
                        <div className="btnArea">
                            <a
                                onClick={() => dispatch(showModalAction())}
                                className="btn btn-primary btn-block"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallAction;
