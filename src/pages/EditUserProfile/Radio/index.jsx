import React from 'react';

import { Element } from 'react-scroll';

const Radio = ({ input }) => {
    return (
        <div className="dashboardBoxBg">
            <div className="profileIntro">
                {input.name && <Element name={`position-${input.name}`} />}
                <h2>Edit Your Profile</h2>
                <div className="custom-radios">
                    <input
                        {...input}
                        type="radio"
                        name="private"
                        id="radio-1"
                        value="true"
                        checked={input.value === 'true'}
                    />
                    <label htmlFor="radio-1">Private Profile</label>
                    <input
                        {...input}
                        type="radio"
                        name="public"
                        id="radio-2"
                        value="false"
                        checked={input.value === 'false'}
                    />
                    <label htmlFor="radio-2">Public Profile</label>
                </div>
            </div>
        </div>
    );
};

export default Radio;
