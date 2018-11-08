import React, { Component } from 'react';
import './style.scss';

import Card from './Card';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAll } from '../../../ducks/addBusiness';
import { reset } from 'redux-form';
import { resetFiles } from '../../../ducks/files';

class Step3 extends Component {
    componentDidMount = () => {
        this.props.toTop();
    };

    handleResetAll = () => {
        const { dispatch } = this.props;

        dispatch(resetAll());
        dispatch(resetFiles());
        dispatch(reset('addBusiness'));
    };

    render() {
        const {
            addedBusinessInfo: { linkId }
        } = this.props;
        return (
            <div className="tab-pane">
                <div className="form-section-three">
                    <div className="complete-section">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3>
                                    <span className="fa fa-check" /> Congratulation!
                                </h3>
                                <p className="success-msg">
                                    You’ve successfully signed up to a free business listing on
                                    Searfi.
                                    <br />
                                    Great to have you on board.
                                </p>
                                <p className="searfi-note">
                                    Our Searfi is in the process of verifying your business so it
                                    may take up to 24 hours for it to appear in our search results.
                                    <br />
                                    You'll receive an email when your business is live.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <Link
                                    to={`/business-center/${linkId}`}
                                    className="btn btn-primary btn-block"
                                >
                                    <i className="fa fa-pencil" aria-hidden="true" /> Edit Your
                                    Business Account
                                </Link>
                            </div>
                            <div className="col-sm-4">
                                <Link to="/business-center" className="btn btn-primary btn-block">
                                    <i className="fa fa-eye" aria-hidden="true" /> View Business
                                    Account Listing
                                </Link>
                            </div>
                            <div className="col-sm-4">
                                <Link
                                    to="/add-business"
                                    className="btn btn-primary btn-block"
                                    onClick={this.handleResetAll}
                                >
                                    <i className="fa fa-plus" aria-hidden="true" /> Add Another
                                    Business
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h4>Take a look at your Subscription Plan</h4>
                            </div>
                            <Card
                                header={{ first: 'Free', second: 'Need Free Support' }}
                                price={0}
                                more={() => false}
                                advancedClass="advancedSupport active"
                                pluses={0}
                                benefits={[6, 8, 5, 6]}
                                btnText="Get Started"
                            />
                            <Card
                                header={{ first: 'Basic', second: 'Need Basic Support' }}
                                price={2000}
                                isActive
                                advancedClass="advancedSupport"
                                pluses={1}
                                benefits={[25, 20, 10, 10]}
                                more={() => (
                                    <p>
                                        Below Basic <a href="#">Preview</a>
                                    </p>
                                )}
                                btnText="Upgrade"
                            />

                            <Card
                                header={{ first: 'Premium', second: 'Need Premium Support' }}
                                price={3000}
                                isActive
                                advancedClass="advancedSupport"
                                pluses={3}
                                benefits={[30, 25, 15, 10]}
                                more={() => (
                                    <p>
                                        Above Premium <a href="#">Preview</a>
                                    </p>
                                )}
                                btnText="Upgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ addBusiness }) => ({
    addedBusinessInfo: addBusiness.addedBusinessInfo
});

export default connect(mapStateToProps)(Step3);
