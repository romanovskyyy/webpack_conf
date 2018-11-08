import React, { Component } from 'react';
import './style.scss';

import DropDown from '../../../../../components/UI/DropDown';

import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import { requiredArr, maxLength3 } from '../../../../../helpers/validation';
import { updateBusiness } from '../../../../../ducks/businessCenter';
import { createDeepEqualSelector } from '../../../../../helpers/common';
import { deleteSubcategories } from '../../../../../ducks/dropdown';

class Categories extends Component {
    componentWillUnmount = () => {
        this.props.dispatch(deleteSubcategories());
    };

    render() {
        const {
            handleSubmit,
            initialValues,
            categories,
            subcategories,
            services,
            dispatch,
            business
        } = this.props;
        return (
            <div id="categories" class="businessInfoPanel">
                <div class="categoriesSection">
                    <div class="panelTextArea">
                        <h3>Categories &amp; Services</h3>
                        <p>
                            Selecting the category and services relevant to your business makes the
                            listing appear in the most relevant search results
                        </p>
                        <Form
                            onSubmit={handleSubmit((val) =>
                                dispatch(updateBusiness(val, business.id))
                            )}
                        >
                            <div class="locationFormArea">
                                <div class="row">
                                    <div class="form-group col-sm-12 col-xs-12">
                                        <label htmlFor="UserNameProfile">Category</label>
                                        <div class="searchPart">
                                            <Field
                                                name="parentCategoriesIds"
                                                component={DropDown}
                                                validate={[requiredArr, maxLength3]}
                                                multiple
                                                defaultText="Category"
                                                reduxFormName="businessCenter"
                                                savedValue={initialValues.parentCategoriesIds}
                                                className={{
                                                    select: 'search dropdown parent',
                                                    wrapper: 'searchPartInner',
                                                    withDots: '.search.dropdown.parent'
                                                }}
                                                withSubcateg
                                                options={categories}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-xs-12">
                                        <label htmlFor="UserNameProfile">Sub Category</label>
                                        <div class="searchPart">
                                            {!!subcategories.length && (
                                                <Field
                                                    name="subCategoriesIds"
                                                    component={DropDown}
                                                    validate={[requiredArr]}
                                                    multiple
                                                    reduxFormName="businessCenter"
                                                    defaultText="Sub Category"
                                                    savedValue={initialValues.subCategoriesIds}
                                                    className={{
                                                        select: 'search dropdown subcat',
                                                        wrapper: 'searchPartInner',
                                                        withDots: '.search.dropdown.subcat'
                                                    }}
                                                    options={subcategories}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-xs-12">
                                        <label htmlFor="UserNameProfile">Services</label>
                                        <div class="searchPart">
                                            <Field
                                                name="services"
                                                component={DropDown}
                                                multiple
                                                defaultText="Services"
                                                savedValue={initialValues.services}
                                                className={{
                                                    select: 'search dropdown services',
                                                    wrapper: 'searchPartInner',
                                                    withDots: '.search.dropdown.services'
                                                }}
                                                options={services}
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 col-xs-12">
                                        <label htmlFor="UserNameProfile">Brand</label>
                                        <div class="searchPart">
                                            <Field
                                                name="brand"
                                                component={DropDown}
                                                multiple
                                                disabled
                                                defaultText="Brand"
                                                savedValue={initialValues.brand}
                                                className={{
                                                    select: 'search dropdown brand',
                                                    wrapper: 'searchPartInner',
                                                    withDots: '.search.dropdown.brand'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="submitButtonArea">
                                <button type="submit" class="btn btn-primary">
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

const getParentCategories = (state) => state.businessProfile.business.categories;
const getChildrenCategories = (state) => state.businessProfile.business.categories;
const getServices = (state) => state.businessProfile.business.services;

const parentCategSelector = createDeepEqualSelector(getParentCategories, (categories) =>
    categories.filter((item) => item.parent === null).map((item) => String(item.id))
);
const childrenCategSelector = createDeepEqualSelector(getChildrenCategories, (categories) =>
    categories.filter((item) => item.parent !== null).map((item) => String(item.id))
);
const servicesSelector = createDeepEqualSelector(getServices, (services) =>
    services.map((item) => String(item.id))
);

const mapStateToProps = (state) => {
    return {
        initialValues: {
            parentCategoriesIds: parentCategSelector(state),
            subCategoriesIds: childrenCategSelector(state),
            services: servicesSelector(state)
        },
        business: state.businessProfile.business,
        categories: state.dropdown.category,
        subcategories: state.dropdown.subcategory,
        services: state.dropdown.services
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: 'businessCenter',
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        enableReinitialize: true
    })(Categories)
);
