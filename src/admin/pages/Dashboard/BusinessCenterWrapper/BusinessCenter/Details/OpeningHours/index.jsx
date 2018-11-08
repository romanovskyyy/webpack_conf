import React, { Component } from 'react';
import './style.scss';

import SetHours from './SetHours';
import Translate from '../../../../../../components/Animation/Translate';
import Modal from '../../../../../../components/UI/Modal';
import Checkboxes from './Checkboxes';

import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Field } from 'redux-form';

class OpeningHours extends Component {
    state = {
        showModal: false
    };

    handleShowModal = () => this.setState({ showModal: true });

    handleHideModal = () => this.setState({ showModal: false });

    render() {
        const { openHours, savedCBValue } = this.props;
        const { showModal } = this.state;

        return (
            <AccordionItem className="accordion-item">
                <AccordionItemTitle href="#" className="heading">
                    <div className="icons" />
                    <div className="title">Working Hours</div>
                </AccordionItemTitle>

                <AccordionItemBody className="content accordion__body">
                    <h3>Specify your working hours</h3>
                    <p>
                        Potential customers will check your working hours when viewing you listing.
                        You can create up to two sets of working hours for your business.
                    </p>
                    <div className="hourButtonArea">
                        <a
                            className="btn btn-default btn-hour"
                            // href="#"
                            onClick={this.handleShowModal}
                        >
                            <i className="fa fa-calendar" aria-hidden="true" /> Set Working Hours
                        </a>
                    </div>

                    <div className="additionalItem">
                        <p>In addition to specifying business hours, you can select from below:</p>
                        <Field
                            component={Checkboxes}
                            name="openingHoursList"
                            openHours={openHours}
                            savedCBValue={savedCBValue}
                        />
                    </div>
                    <Translate in={showModal}>
                        <Modal click={this.handleHideModal}>
                            <Field
                                name="openingHours"
                                component={SetHours}
                                hide={this.handleHideModal}
                            />
                        </Modal>
                    </Translate>
                </AccordionItemBody>
            </AccordionItem>
        );
    }
}

export default OpeningHours;
