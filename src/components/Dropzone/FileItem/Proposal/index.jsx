import React, { Component } from 'react';
import './style.scss';

import Radio from '../../../../components/UI/ProposalRadio';

import { Field } from 'redux-form';

export default class Proposal extends Component {
    state = {
        showProposal: false
    };

    handleShowProposal = () => this.setState({ showProposal: true });

    handleHideProposal = () => this.setState({ showProposal: false });

    render() {
        const { showProposal } = this.state;
        const { children, id, isLogo, isPreview } = this.props;
        return (
            <div
                onMouseEnter={this.handleShowProposal}
                onMouseLeave={this.handleHideProposal}
                className={`image-wrapper ${showProposal ? 'showProposal' : 'hideProposal'}`}
            >
                <div className="proposal">
                    <Field name="logoId" text="Logo" component={Radio} id={id} checked={isLogo} />
                    <Field
                        name="previewId"
                        text="Store-front"
                        component={Radio}
                        id={id}
                        checked={isPreview}
                    />
                </div>
                {children}
            </div>
        );
    }
}
