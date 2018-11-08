import React from 'react';

export const handleRenderStars = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<i key={`stars_active_${i}`} className={`icon ${i < rate ? 'active' : ''}`} />);
    }
    return stars;
};

export const handleRenderBusinessStars = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <li key={`stars_business${i}`}>
                <i className={`fa ${i < rate ? 'fa-star' : 'fa-star-o'}`} />
            </li>
        );
    }
    return stars;
};

export const handleRenderStepsIndicator = (activeStep) => {
    const steps = [];
    for (let i = 0; i < 5; i++) {
        steps.push(
            <div
                key={`steps_active_${i}`}
                className={`step-slider step-slider-item ${i < activeStep ? 'active' : ''}`}
            />
        );
    }
    return steps;
};
