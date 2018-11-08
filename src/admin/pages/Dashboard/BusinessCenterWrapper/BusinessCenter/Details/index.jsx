import React, { Component } from 'react';
import './style.scss';

import Basic from './Basic';
import Contact from './Contact';
import Tags from './Tags';
import Social from './Social';
import CoverPhoto from './CoverPhoto';
import OpeningHours from './OpeningHours';
import Registration from './Registration';
import Payment from './Payment';

import diff from 'object-diff';

import { Accordion } from 'react-accessible-accordion';
import { reduxForm, Form, getFormSyncErrors, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { updateBusiness } from '../../../../../ducks/businessCenter';
import { makeInitialData, createDeepEqualSelector } from '../../../../../helpers/common';
import { asyncValidate } from '../../../../../helpers/validation';

const findErrorParent = () => {
    $('.accordion')
        .find('.form-group.error')
        .closest('.accordion-item')
        .addClass('accordion-error');
};
class Details extends Component {
    handleCompareValues = (val) => {
        const initial = {
            ...this.props.initialValues
        };
        return diff(initial, val);
    };

    componentDidUpdate = (prevProps) => {
        const { formSyncErrors, submitFailed } = this.props;
        const prevSyncErrorsLength = Object.keys(prevProps.formSyncErrors).length;
        const currentSyncErrorsLength = Object.keys(formSyncErrors).length;

        if (prevSyncErrorsLength > currentSyncErrorsLength && submitFailed) {
            $('.accordion .accordion-error').removeClass('accordion-error');
            setTimeout(() => findErrorParent(), 10);
        }
    };

    render() {
        const {
            handleSubmit,
            tags,
            amazonFiles,
            dispatch,
            openHours,
            paymentOptions,
            savedTags,
            savedFiles,
            savedOpeningHoursCB,
            savedPaymentCB,
            logoId,
            previewId,
            business
        } = this.props;

        return (
            <div id="details" className="businessInfoPanel">
                <div className="infoAccordionPanel">
                    <div className="panelTextArea">
                        <h3>Business Details</h3>
                        <p>
                            Here you can update your business details. If you have the time, provide
                            as much information as possible - it's advantagous to your potential
                            customers!
                        </p>
                    </div>
                    <div className="accordionPanel">
                        <Form
                            onSubmit={handleSubmit((val) =>
                                dispatch(updateBusiness(this.handleCompareValues(val), business.id))
                            )}
                        >
                            <Accordion className="accordion">
                                <Basic />
                                <Contact />
                                <Tags tags={tags} savedValue={savedTags} />
                                <Social />

                                <CoverPhoto
                                    amazonFiles={amazonFiles}
                                    dispatch={dispatch}
                                    id={business.id}
                                    savedFiles={savedFiles}
                                    logoId={logoId}
                                    previewId={previewId}
                                />
                                <OpeningHours
                                    openHours={openHours}
                                    savedCBValue={savedOpeningHoursCB}
                                />
                                <Registration />
                                <Payment
                                    paymentOptions={paymentOptions}
                                    savedCBValue={savedPaymentCB}
                                />
                            </Accordion>

                            <div className="submitButtonArea">
                                <button type="submit" className="btn btn-primary">
                                    Save Change
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const getBusinessTags = ({ tags }) => tags;
const getOpeningHoursInitialData = ({ openingHours }) => openingHours;
const getPaymentDetailsIds = ({ paymentDetails }) => paymentDetails;
const getOpeningHoursList = ({ openingHoursList }) => openingHoursList;

const paymentDetailsIdsSelector = createDeepEqualSelector(getPaymentDetailsIds, (detail) =>
    detail.map(({ id }) => id)
);
const openingHoursListSelector = createDeepEqualSelector(getOpeningHoursList, (hour) =>
    hour.map(({ id }) => id)
);
const openingHoursSelector = createDeepEqualSelector(getOpeningHoursInitialData, makeInitialData);
const getChildrenCategoriesSelector = createDeepEqualSelector(getBusinessTags, (tags) =>
    tags.map(({ id }) => id)
);

const selector = formValueSelector('businessCenter');

const mapStateToProps = (state) => {
    return {
        initialValues: {
            name: state.businessProfile.business.name,
            slogan: state.businessProfile.business.slogan,
            description: state.businessProfile.business.description,
            contactNumber: state.businessProfile.business.contactNumber,
            phoneNumber: state.businessProfile.business.phoneNumber,
            email: state.businessProfile.business.email,
            website: state.businessProfile.business.website,
            facebookUrl: state.businessProfile.business.facebookUrl,
            twitterUrl: state.businessProfile.business.twitterUrl,
            instagramUrl: state.businessProfile.business.instagramUrl,
            snapchatUrl: state.businessProfile.business.snapchatUrl,
            listingTitle: state.businessProfile.business.listingTitle,
            tradeNumber: state.businessProfile.business.tradeNumber,
            openingHoursList: openingHoursListSelector(state.businessProfile.business),
            paymentDetailsIds: paymentDetailsIdsSelector(state.businessProfile.business),
            openingHours: openingHoursSelector(state.businessProfile.business)
        },
        formSyncErrors: getFormSyncErrors('businessCenter')(state),
        savedTags: getChildrenCategoriesSelector(state.businessProfile.business),
        savedFiles: state.businessProfile.business.coverPhoto,
        savedOpeningHoursCB: state.businessProfile.business.openingHoursList,
        logoId: selector(state, 'logoId'),
        previewId: selector(state, 'previewId'),
        amazonFiles: state.addBusiness.files,
        business: state.businessProfile.business,
        tags: state.dropdown.tags,
        openHours: state.businessCenter.openingHours,
        paymentOptions: state.businessCenter.paymentOptions
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: 'businessCenter',
        touchOnBlur: false,
        touchOnChange: true,
        destroyOnUnmount: false,
        asyncValidate,
        asyncChangeFields: ['tradeNumber'],
        enableReinitialize: true,
        forceUnregisterOnUnmount: true,
        onSubmitFail: (errors) => {
            findErrorParent();
        }
    })(Details)
);
