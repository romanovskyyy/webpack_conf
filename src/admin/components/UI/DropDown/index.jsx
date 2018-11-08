import React, { Component } from 'react';
import './style.scss';

import { nameRender } from '../../../helpers/errors';
import { capitalizeFirstLetter } from '../../../helpers/common';
import { setAreaLabel, setCityLabel } from '../../../ducks/addBusiness';
import { getAreaAction, getCategoryAction } from '../../../ducks/dropdown';
import { Element } from 'react-scroll';
import { clearFields, change } from 'redux-form';
import { isEqual } from 'lodash';

class DropDown extends Component {
    componentDidMount = () => {
        let {
            className,
            input,
            savedValue = '',
            meta,
            withSubcateg,
            reduxFormName = 'addBusiness',
            clearable = true
        } = this.props;

        $(className.withDots).dropdown({
            forceSelection: false,
            match: 'text',
            fullTextSearch: true,
            onChange: (value, text) => {
                input.onChange(value);
                if (input.name === 'area') {
                    meta.dispatch(setAreaLabel(text));
                } else if (input.name === 'city') {
                    meta.dispatch(setCityLabel(text));
                    meta.dispatch(getAreaAction(value));
                }
                if (input.name === 'parentCategoryId') {
                    meta.dispatch(change(reduxFormName, 'childrenCategoryIds', ''));
                    $('.ui.dropdown.subcat').dropdown('clear');
                }
                if (input.name === 'parentCategoriesIds') {
                    meta.dispatch(change(reduxFormName, 'subCategoriesIds', ''));
                    $('.ui.dropdown.subcat').dropdown('clear');
                }
            }
        });

        if (savedValue && typeof savedValue === 'object' && !savedValue.length) {
            savedValue = false;
        }
        $(`${className.withDots}`).dropdown('set selected', savedValue);

        setTimeout(() => {
            const icon = $(`${className.withDots} .icon`);
            if (icon && icon[0]) {
                icon[0].addEventListener('click', this.handleClearValue);
            }
        }, 10);

        if (savedValue && clearable) {
            $(`${className.withDots} .icon`).addClass('clear');
        }
        if (withSubcateg) {
            this.handleGetSubcategory();
        }
    };

    handleClearValue = (e) => {
        const { className } = this.props;
        const icon = $(`${className.withDots} .icon`);

        if (icon[0].classList.contains('clear')) {
            e.stopPropagation();
            $(`${className.withDots}`).dropdown('clear');
            $(`${className.withDots} input.search`).val('');
        }
    };

    componentDidUpdate = (prevProps) => {
        const { clearable = true, withSubcateg = false, input } = this.props;
        const className = this.props.className.withDots;
        const icon = $(`${className} .icon`);
        let value = $(`${className}`).dropdown('get value');

        if (typeof value === 'object' && !value.length) {
            value = false;
        }

        if (withSubcateg && !isEqual(prevProps.input.value, input.value)) {
            this.handleGetSubcategory();
        }
        if (!clearable) {
            return;
        }
        if (value) {
            icon[0].classList.add('clear');
        } else {
            icon[0].classList.remove('clear');
        }
    };

    handleGetSubcategory = () => {
        const { input, meta } = this.props;
        const queryString = input.value && input.value.map((item) => `&parent=${item}`).join('');
        return meta.dispatch(getCategoryAction(queryString));
    };

    componentWillUnmount = () => {
        const { className } = this.props;
        const icon = $(`${className.withDots} .icon`);

        $(className.withDots).dropdown('destroy');
        icon[0].removeEventListener('click', this.handleClearValue);
    };
    render() {
        const {
            className,
            options = [],
            meta,
            input,
            defaultText,
            multiple = false,
            disabled = false
        } = this.props;
        return (
            <React.Fragment>
                <div
                    title={capitalizeFirstLetter(nameRender(input.name))}
                    className={`${className.wrapper} ${meta.error && meta.touched && 'error'}`}
                >
                    {input.name && <Element name={`position-${input.name}`} />}

                    <select
                        className={`${className.select} ${disabled ? 'disabled' : ''}`}
                        multiple={multiple}
                    >
                        <option value="">{defaultText}</option>
                        {options.map((item, index) => (
                            <option key={item.label + index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                {meta.error &&
                    meta.touched && (
                        <span className="error">
                            {nameRender(input.name)} {meta.error}
                        </span>
                    )}
            </React.Fragment>
        );
    }
}

export default DropDown;
