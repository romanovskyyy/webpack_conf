import React from 'react';

import EditUserInput from '../../../../../../components/UI/EditUserInput';

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Field } from 'redux-form';

const Registration = () => {
    return (
        <AccordionItem className="accordion-item">
            <AccordionItemTitle href="#" className="heading">
                <div className="icons" />
                <div className="title">Registration</div>
            </AccordionItemTitle>

            <AccordionItemBody className="content accordion__body">
                <h3>Why use Trade License Number fields?</h3>
                <p>
                    Searfi encourages businesses to include their Trade License Number. Displaying
                    these details will provide protential customers with peace of mind when
                    considering your business.
                </p>
                <div className="row">
                    <Field
                        name="tradeNumber"
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        label="Trade License Number"
                        placeholder="Enter Trade License Number"
                    />
                </div>
            </AccordionItemBody>
        </AccordionItem>
    );
};

export default Registration;
