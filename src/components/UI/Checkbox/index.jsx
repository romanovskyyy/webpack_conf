import React from 'react';

import { Element } from 'react-scroll';

const Checkbox = (field) => {
    return (
        <div className="col-sm-12">
            {field.input.name && <Element name={`position-${field.input.name}`} />}
            <div className="ui checkbox checked">
                <input
                    type="checkbox"
                    name="example"
                    id={field.id}
                    {...field.input}
                    checked={field.input.value}
                />
                {field.label()}
            </div>
            {field.meta.error &&
                field.meta.touched && (
                    <span style={{ marginTop: '5px', marginBottom: '5px' }} className="error">
                        {field.errorText}
                    </span>
                )}
        </div>
    );
};

export default Checkbox;
