import React from 'react';

import SendReview from './SendReview';
import Reviews from './ReviewList';

const Tab2 = () => {
    return (
        <div className="ui tab active" data-tab="second">
            <SendReview />
            <Reviews />
        </div>
    );
};

export default Tab2;
