import React, { Component } from 'react';

import AddBusinessInp from '../../../components/UI/AddBusinessInp';
import DropDown from '../../../components/UI/DropDown';
import SubCategory from './SubCategory';
import FilterTag from './FilterTag';
import DnD from './DnD';
import Checkbox from '../../../components/UI/Checkbox';

import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, maxLength3, requiredArr } from '../../../helpers/validation';

class Step2 extends Component {
    componentDidMount = () => {
        this.props.startAsyncValidate();
    };

    render() {
        const {
            prev,
            categoryVal,
            category,
            subcategory,
            subcategoryVal,
            acceptedFiles,
            rejectedFiles,
            tags,
            tagsVal
        } = this.props;

        return (
            <div className="tab-pane">
                <div className="form-section-two">
                    <h3>Please Select a category for your business</h3>
                    <p>
                        Search a keyword that best describes your business below. This will help us
                        make sure it appears in relevant search results.
                    </p>

                    <div className="row">
                        <Field
                            name="listingTitle"
                            component={AddBusinessInp}
                            placeholder="Listing Title"
                            className="col-sm-12"
                            validate={required}
                            type="text"
                        />
                        <Field
                            name="slogan"
                            component={AddBusinessInp}
                            placeholder="Slogan"
                            className="col-sm-12"
                            type="text"
                        />
                        <Field
                            name="description"
                            component={AddBusinessInp}
                            placeholder="Describe the listing"
                            className="col-sm-12"
                            type="textarea"
                            validate={required}
                        />
                        <div className="col-sm-12">
                            <div className="searchPart">
                                <div className="searchPartInner">
                                    <Field
                                        name="parentCategoryId"
                                        component={DropDown}
                                        defaultText="Select Main Category"
                                        className={{
                                            select: 'search dropdown parent',
                                            wrapper: 'searchSelectboxes',
                                            withDots: '.search.dropdown.parent'
                                        }}
                                        clearable={false}
                                        options={category}
                                        savedValue={categoryVal}
                                        validate={required}
                                    />
                                </div>
                            </div>
                        </div>
                        {categoryVal && (
                            <Field
                                name="childrenCategoryIds"
                                component={SubCategory}
                                options={subcategory}
                                validate={[requiredArr, maxLength3]}
                                savedValue={subcategoryVal}
                            />
                        )}
                        <Field
                            name="tagIds"
                            component={FilterTag}
                            validate={[maxLength3]}
                            options={tags}
                            savedValue={tagsVal}
                        />
                        <Field
                            name="license"
                            component={AddBusinessInp}
                            placeholder="Business License #"
                            className="col-sm-6"
                            type="text"
                            validate={required}
                        />
                        <Field
                            name="vatCertificate"
                            component={AddBusinessInp}
                            placeholder="VAT Certificate #"
                            className="col-sm-6"
                            type="text"
                        />
                        <Field
                            name="files"
                            component={DnD}
                            validate={required}
                            acceptedFiles={acceptedFiles}
                            rejectedFiles={rejectedFiles}
                        />

                        <Field
                            name="terms"
                            component={Checkbox}
                            id="cb_agree"
                            label={() => (
                                <label htmlFor="cb_agree">
                                    I agree to the Searfi Website
                                    <Link to="#"> Terms and Conditions</Link>
                                </label>
                            )}
                            validate={required}
                            errorText="You must agree with our Terms and Conditions"
                        />
                        <Field
                            name="authorized"
                            id="cb_authorized"
                            component={Checkbox}
                            label={() => (
                                <label htmlFor="cb_authorized">
                                    I warrant that I am an authorised representative of this
                                    business*
                                </label>
                            )}
                            validate={required}
                            errorText="You must warrant that you authorised to represent this business"
                        />
                    </div>
                </div>
                <div className="row button-area">
                    <div className="col-sm-4 col-sm-push-2 col-xs-6">
                        <a
                            className="btn btn-default btn-block prev-step"
                            onClick={() =>
                                prev([
                                    'listingTitle',
                                    'slogan',
                                    'description',
                                    'parentCategoryId',
                                    'childrenCategoryIds',
                                    'tagIds',
                                    'license',
                                    'vatCertificate',
                                    'files',
                                    'terms',
                                    'authorized'
                                ])
                            }
                        >
                            Back
                        </a>
                    </div>
                    <div className="col-sm-4 col-sm-push-2 col-xs-6">
                        <button type="submit" className="btn btn-primary btn-block next-step">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Step2;
