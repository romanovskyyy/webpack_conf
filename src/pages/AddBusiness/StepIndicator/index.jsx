import React from 'react';

const handleActiveStep = (currStep, step) => {
    if (currStep > step || currStep === 3) {
        return 'completed';
    } else if (currStep === step) {
        return 'active';
    } else {
        return 'disabled';
    }
};

const StepIndicator = ({ currStep }) => {
    return (
        <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className={handleActiveStep(currStep, 1)}>
                <a className="persistant-disabled" data-toggle="tab" title="Step 1">
                    <span className="round-tab">1</span>
                </a>
            </li>
            <li role="presentation" className={handleActiveStep(currStep, 2)}>
                <a className="persistant-disabled" data-toggle="tab" title="Step 2">
                    <span className="round-tab">2</span>
                </a>
            </li>
            <li role="presentation" className={handleActiveStep(currStep, 3)}>
                <a className="persistant-disabled" data-toggle="tab" title="Step 3">
                    <span className="round-tab">3</span>
                </a>
            </li>
        </ul>
    );
};

export default StepIndicator;
