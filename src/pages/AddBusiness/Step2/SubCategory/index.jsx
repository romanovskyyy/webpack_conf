import React, { Component } from 'react';

import Item from './Item';

import { connect } from 'react-redux';
import { getCategoryAction } from '../../../../ducks/dropdown';
import { formValueSelector } from 'redux-form';
import { capitalizeFirstLetter } from '../../../../helpers/common';
import { nameRender } from '../../../../helpers/errors';
import { Element } from 'react-scroll';

class DropDown extends Component {
    componentDidMount = () => {
        const { input, dispatch, categoryVal, savedValue = '' } = this.props;

        dispatch(getCategoryAction(`&parent=${categoryVal}`));
        $(`.ui.dropdown.subcat`).dropdown({
            match: 'text',
            fullTextSearch: true,
            onChange: (value) => {
                return input.onChange(!value ? value : value.split(','));
            }
        });
        $(`.ui.dropdown.subcat`).dropdown('set selected', savedValue);
    };

    componentDidUpdate = (prevProps) => {
        const { dispatch, categoryVal } = this.props;
        if (prevProps.categoryVal !== categoryVal) {
            dispatch(getCategoryAction(`&parent=${categoryVal}`));
        }
    };

    componentWillUnmount = () => {
        $('.ui.dropdown').dropdown('destroy');
    };
    render() {
        const { meta, input, options } = this.props;
        return (
            <div
                className="col-sm-12"
                id="sub-category"
                title={capitalizeFirstLetter(nameRender(input.name))}
            >
                {input.name && <Element name={`position-${input.name}`} />}
                <div className={`sub-category ${meta.error && meta.touched && 'error'}`}>
                    <div className="ui fluid multiple search selection dropdown subcat">
                        <input type="hidden" name="country" />
                        <i className="dropdown icon" />
                        <div className="default text">Select Sub Category</div>
                        <div className="menu">
                            {options.map((item) => (
                                <Item key={item.value} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {meta.error &&
                    meta.touched && <span className="error">Subcategory {meta.error}</span>}
            </div>
        );
    }
}

const selector = formValueSelector('addBusiness');

const mapStateToProps = (state) => ({
    categoryVal: selector(state, 'parentCategoryId')
});

export default connect(mapStateToProps)(DropDown);
