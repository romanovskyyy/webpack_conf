import React from 'react';

import EditUserInput from '../../../../../components/UI/EditUserInput';

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Field } from 'redux-form';

const Social = () => {
    return (
        <AccordionItem className="accordion-item">
            <AccordionItemTitle href="#" className="heading">
                <div className="icons" />
                <div className="title">Social Media Contact</div>
            </AccordionItemTitle>

            <AccordionItemBody className="content accordion__body">
                <div className="row">
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="facebookUrl"
                        label="Facebook link"
                    />
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="twitterUrl"
                        label="Twitter link"
                    />
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="instagramUrl"
                        label="Instagram link"
                    />
                    <Field
                        component={EditUserInput}
                        type="text"
                        className="col-sm-12"
                        name="snapchatUrl"
                        label="Snapchat link"
                    />
                </div>
            </AccordionItemBody>
        </AccordionItem>
    );
};

export default Social;
