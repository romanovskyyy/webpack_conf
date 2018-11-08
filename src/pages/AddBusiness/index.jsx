import React, { Component } from 'react';
import './style.scss';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import StepIndicator from './StepIndicator';

import { nextStep, prevStep, resetAll, submitBusiness } from '../../ducks/addBusiness';
import { resetFiles } from '../../ducks/files';

import {
    reduxForm,
    Form,
    setSubmitSucceeded,
    setSubmitFailed,
    formValueSelector,
    untouch,
    getFormSyncErrors,
    getFormAsyncErrors
} from 'redux-form';
import { connect } from 'react-redux';
import { scrollToFirstError } from '../../helpers/scrollToError';
import { asyncValidate, defaultShouldAsyncValidate } from '../../helpers/validation';

class AddBusiness extends Component {
    handleNextStep = (fields) => {
        const { valid, dispatch, formSyncErrors, formAsyncErrors } = this.props;
        const uniteErrors = { ...formSyncErrors, ...formAsyncErrors };
        if (valid) {
            this.moveToTop();
            dispatch(nextStep());
            dispatch(setSubmitSucceeded('addBusiness'));
        } else {
            dispatch(setSubmitFailed('addBusiness', ...fields));
            scrollToFirstError(uniteErrors);
        }
    };

    moveToTop = () => {
        document.querySelector('.BusinessRegistrationForm').scrollIntoView(true);
    };

    handlePrevStep = (fields) => {
        this.moveToTop();
        this.props.dispatch(prevStep());
        this.props.dispatch(untouch('addBusiness', ...fields));
    };

    startAsyncValidate = () => {
        this.props.asyncValidate();
    };

    componentWillUnmount = () => {
        const { dispatch } = this.props;
        dispatch(resetAll());
        dispatch(resetFiles());
    };

    render() {
        const {
            handleSubmit,
            categoryVal,
            currStep,
            category,
            subcategory,
            dispatch,
            subcategoryVal,
            acceptedFiles,
            rejectedFiles,
            tags,
            tagsVal,
            cityVal,
            areaVal,
            area,
            city
        } = this.props;
        return (
            <section className="clearfix worksArea">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="stepper">
                                <StepIndicator currStep={currStep} />
                                <Form
                                    onSubmit={handleSubmit((val) => dispatch(submitBusiness(val)))}
                                    className="BusinessRegistrationForm"
                                    acceptCharset="UTF-8"
                                >
                                    {(() => {
                                        switch (currStep) {
                                            case 1:
                                                return (
                                                    <Step1
                                                        next={this.handleNextStep}
                                                        cityVal={cityVal}
                                                        city={city}
                                                        areaVal={areaVal}
                                                        area={area}
                                                    />
                                                );
                                            case 2:
                                                return (
                                                    <Step2
                                                        next={this.handleNextStep}
                                                        prev={this.handlePrevStep}
                                                        categoryVal={categoryVal}
                                                        category={category}
                                                        subcategory={subcategory}
                                                        subcategoryVal={subcategoryVal}
                                                        acceptedFiles={acceptedFiles}
                                                        rejectedFiles={rejectedFiles}
                                                        tags={tags}
                                                        tagsVal={tagsVal}
                                                        startAsyncValidate={this.startAsyncValidate}
                                                    />
                                                );
                                            case 3:
                                                return (
                                                    <Step3
                                                        toTop={this.moveToTop}
                                                        next={this.handleNextStep}
                                                        prev={this.handlePrevStep}
                                                    />
                                                );
                                            default:
                                                return <Step1 next={this.handleNextStep} />;
                                        }
                                    })()}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const selector = formValueSelector('addBusiness');

const mapStateToProps = (state) => ({
    initialValues: { email: state.auth.userData.email },
    categoryVal: selector(state, 'parentCategoryId'),
    subcategoryVal: selector(state, 'childrenCategoryIds'),
    cityVal: selector(state, 'city'),
    tagsVal: selector(state, 'tagIds'),
    areaVal: selector(state, 'area'),
    formSyncErrors: getFormSyncErrors('addBusiness')(state),
    formAsyncErrors: getFormAsyncErrors('addBusiness')(state),
    category: state.dropdown.category,
    area: state.dropdown.area,
    subcategory: state.dropdown.subcategory,
    currStep: state.addBusiness.currStep,
    acceptedFiles: state.files.acceptedFiles,
    rejectedFiles: state.files.rejectedFiles,
    tags: state.dropdown.tags,
    city: state.dropdown.city
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'addBusiness',
        touchOnBlur: false,
        asyncValidate: (values, dispatch, initialValues, field = 'license') =>
            asyncValidate(values, dispatch, initialValues, field),
        asyncChangeFields: ['email', 'license'],
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        shouldAsyncValidate: (params) =>
            defaultShouldAsyncValidate({ ...params, syncValidationPasses: true }),
        onSubmitFail: (errors) => scrollToFirstError(errors)
    })(AddBusiness)
);
