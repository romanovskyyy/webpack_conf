import React, { Component } from 'react';
import Tag from './Tag';

import { isEqual } from 'lodash-es';

class TagFilter extends Component {
    componentDidMount = () => {
        const { input, savedValue = [], className } = this.props;
        $(`.ui.dropdown.${className}`).dropdown({
            match: 'text',
            fullTextSearch: true,
            onChange: (value) => input.onChange(value.split(',').map(Number))
        });
        if (savedValue.length)
            $(`.ui.dropdown.${className}`).dropdown('set selected', savedValue.map(String));
    };

    componentWillUnmount = () => {
        $(`.ui.dropdown.${this.props.className}`).dropdown('destroy');
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { className, savedValue } = this.props;

        if (!isEqual(prevProps.savedValue, savedValue)) {
            $(`.ui.dropdown.${className}`).dropdown('refresh');
            setTimeout(() => {
                $(`.ui.dropdown.${className}`).dropdown('set selected', savedValue.map(String));
            }, 10);
        }
    };

    render() {
        const { className, tags = [], placeholder = 'Filter by Tags', meta } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12 col-xs-12">
                        <div className={`ui multiple dropdown ${className}`}>
                            <input type="hidden" name="filters" />
                            <i className="filter icon" />
                            <span className="text">{placeholder}</span>
                            <div className="menu">
                                <div className="ui icon search input">
                                    <i className="search icon" />
                                    <input type="text" placeholder="Search tags..." />
                                </div>
                                <div className="divider" />
                                <div className="header">Tag Label</div>
                                <div className="scrolling menu">
                                    {tags.map((item) => (
                                        <Tag
                                            key={item.value}
                                            val={item.value}
                                            color={item.color}
                                            label={item.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {meta.error && meta.touched && <span className="error">{meta.error}</span>}
            </React.Fragment>
        );
    }
}

export default TagFilter;
