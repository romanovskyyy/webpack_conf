import React from 'react';

import EditUserInput from '../../../../../../components/UI/EditUserInput';

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Field } from 'redux-form';
import { required } from '../../../../../../helpers/validation';
import { phone } from '../../../../../../helpers/normalize';

const Contact = () => {
    return (
        <AccordionItem className="accordion-item">
            <AccordionItemTitle href="#" className="heading">
                <div className="icons" />
                <div className="title">Contact Details</div>
            </AccordionItemTitle>

            <AccordionItemBody className="content accordion__body">
                <div className="row">
                    <Field
                        component={EditUserInput}
                        type="tel"
                        className="col-sm-12"
                        name="contactNumber"
                        label="Phone Number"
                        validate={required}
                        normalize={(val) => phone(val)}
                    />
                    <Field
                        component={EditUserInput}
                        type="tel"
                        className="col-sm-12"
                        name="phoneNumber"
                        label="Mobile Phone"
                        normalize={(val) => phone(val)}
                    />
                    <Field
                        component={EditUserInput}
                        type="email"
                        className="col-sm-12"
                        name="email"
                        label="Email"
                        validate={required}
                    />
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="website"
                        label="Website"
                    />
                </div>
            </AccordionItemBody>
        </AccordionItem>
    );
};

export default Contact;
