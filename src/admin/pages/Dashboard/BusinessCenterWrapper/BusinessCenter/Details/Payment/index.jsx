import React from 'react';

import { Field } from 'redux-form';
import PaymentOption from './PaymentOption';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

const Payment = ({ paymentOptions }) => {
    return (
        <AccordionItem className="accordion-item">
            <AccordionItemTitle href="#" className="heading">
                <div className="icons" />
                <div className="title">Payment Details</div>
            </AccordionItemTitle>

            <AccordionItemBody className="content accordion__body">
                <h3>Payment options</h3>
                <p>
                    Choose all the available payment options which you support from the below
                    dropdown list which gives customer a clear understanding of their mode of
                    payment accepted by the business
                </p>
                <ul className="payment-list">
                    <Field
                        component={PaymentOption}
                        name="paymentDetailsIds"
                        paymentOptions={paymentOptions}
                    />
                </ul>
            </AccordionItemBody>
        </AccordionItem>
    );
};

export default Payment;
