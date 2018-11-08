import React from 'react';

import { TimeInput } from 'semantic-ui-calendar-react';

const Time = ({ input, isClosed = false, meta }) => {
    const handleChange = (event, { name, value }) => {
        input.onChange(value);
    };
    return (
        <React.Fragment>
            <TimeInput
                name="startTime"
                placeholder="Time"
                value={input.value}
                iconPosition="left"
                onChange={handleChange}
                closable={true}
                popupPosition="top left"
                autoComplete="off"
                disabled={isClosed}
            />

            {meta.error && meta.touched && <span className="error">{meta.error}</span>}
        </React.Fragment>
    );
};

export default Time;
