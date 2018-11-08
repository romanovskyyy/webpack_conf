import React, { Component } from 'react';

import TagFilter from '../../../../../components/TagFilter';

import { Field } from 'redux-form';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

class Tags extends Component {
    render() {
        const { tags, savedValue } = this.props;
        return (
            <AccordionItem className="accordion-item">
                <AccordionItemTitle href="#" className="heading">
                    <div className="icons" />
                    <div className="title">Tags</div>
                </AccordionItemTitle>

                <AccordionItemBody className="content accordion__body">
                    <h3>Add your required tags to specify your business</h3>
                    <p>
                        Choose all the available tags which is support from the below dropdown list
                        which gives customer a clear understanding of the your business
                    </p>
                    <Field
                        name="tagIds"
                        component={TagFilter}
                        savedValue={savedValue}
                        tags={tags}
                        className="filter"
                    />
                </AccordionItemBody>
            </AccordionItem>
        );
    }
}

export default Tags;
