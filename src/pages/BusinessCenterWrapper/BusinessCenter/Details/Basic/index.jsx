import React from 'react';

import EditUserInput from '../../../../../components/UI/EditUserInput';

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Field } from 'redux-form';
import { required } from '../../../../../helpers/validation';

const Basic = ({}) => {
    return (
        <AccordionItem className="accordion-item">
            <AccordionItemTitle href="#" className="heading">
                <div className="icons" />
                <div className="title">Basic Details</div>
            </AccordionItemTitle>
            <AccordionItemBody className="content accordion__body">
                <div className="row">
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="name"
                        label="Business Name"
                        validate={required}
                    />
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="listingTitle"
                        label="Listing Title"
                        validate={required}
                    />
                    <Field
                        component={EditUserInput}
                        type="textarea"
                        name="slogan"
                        label="Slogan"
                        placeholder="e.g. UAE number one source of trusted opinions on all things local."
                    />
                    <Field
                        component={EditUserInput}
                        type="textarea"
                        name="description"
                        label="Description"
                        placeholder="e.g. Helping UAE discover and experience all things..."
                        validate={required}
                    />
                </div>
            </AccordionItemBody>
        </AccordionItem>
    );
};

export default Basic;
