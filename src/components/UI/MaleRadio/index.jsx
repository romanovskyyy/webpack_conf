import React from 'react';

const MaleRadio = (field) => {
    return (
        <div className="form-group">
            <ul className="custom-options gender">
                <li>
                    <input
                        {...field.input}
                        type="radio"
                        name="male"
                        value="1"
                        id="male"
                        checked={field.input.value === '1'}
                    />
                    <label htmlFor="male">
                        <span className="radio-icon">
                            <span className="fa fa-male" data-icon="³" />
                        </span>
                        <span className="radio-content">Male</span>
                    </label>
                </li>
                <li>
                    <input
                        {...field.input}
                        type="radio"
                        name="female"
                        value="2"
                        id="female"
                        checked={field.input.value === '2'}
                    />
                    <label htmlFor="female">
                        <span className="radio-icon">
                            <span className="fa fa-female" data-icon="±" />
                        </span>
                        <span className="radio-content">Female</span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default MaleRadio;
