import React, { Component } from 'react';

import TagFilter from '../../../../components/TagFilter';
import { capitalizeFirstLetter } from '../../../../helpers/common';
import { nameRender } from '../../../../helpers/errors';
import { Element } from 'react-scroll';

export default class FilterTag extends Component {
    render() {
        const { meta, input, options } = this.props;
        return (
            <div className="col-sm-12" title={capitalizeFirstLetter(nameRender(input.name))}>
                <div className={`resultBar ${meta.error && meta.touched && 'error'}`}>
                    {input.name && <Element name={`position-${input.name}`} />}
                    <TagFilter {...this.props} tags={options} className="filter" />
                </div>
            </div>
        );
    }
}
