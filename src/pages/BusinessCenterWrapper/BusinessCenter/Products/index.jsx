import React, { Component } from 'react';
import './style.scss';

import DropDown from '../../../../components/UI/DropDown';

import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import { requiredArr, maxLength3 } from '../../../../helpers/validation';
import { updateBusiness } from '../../../../ducks/businessCenter';
import { createDeepEqualSelector } from '../../../../helpers/common';

class Products extends Component {
    render() {
        const { initialValues, products, handleSubmit, dispatch, business } = this.props;
        return (
            <div id="products" className="businessInfoPanel">
                <div className="productsSection">
                    <Form
                        onSubmit={handleSubmit((val) => dispatch(updateBusiness(val, business.id)))}
                    >
                        <div className="panelTextArea">
                            <h3>Products</h3>
                            <p>
                                Selecting the products relevant to your business makes the listing
                                appear in the most relevant search results
                            </p>
                            <div className="locationFormArea">
                                <div className="row">
                                    <div className="form-group col-sm-12 col-xs-12">
                                        <label htmlFor="UserNameProfile">Product Groups</label>
                                        <div className="searchPart">
                                            <Field
                                                name="productGroups"
                                                component={DropDown}
                                                multiple
                                                defaultText="Product Groups"
                                                savedValue={initialValues.productGroups}
                                                className={{
                                                    select: 'search dropdown products',
                                                    wrapper: 'searchPartInner',
                                                    withDots: '.search.dropdown.products'
                                                }}
                                                options={products}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="submitButtonArea">
                                <button type="submit" className="btn btn-primary">
                                    Save Change
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const getProducts = (state) => state.businessProfile.business.productGroups;

const productsSelector = createDeepEqualSelector(getProducts, (product) =>
    product.map((item) => String(item.id))
);

const mapStateToProps = (state) => {
    return {
        initialValues: {
            productGroups: productsSelector(state)
        },
        business: state.businessProfile.business,
        products: state.dropdown.products
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: 'businessCenter',
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true,
        enableReinitialize: true
    })(Products)
);
