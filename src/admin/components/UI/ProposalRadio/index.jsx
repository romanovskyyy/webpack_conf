import React from 'react';

const ProposalRadio = ({ text, input, id, checked }) => {
    const handleOnChange = () => input.onChange(id);
    return (
        <label>
            <input
                type="radio"
                name={input.name}
                onChange={handleOnChange}
                defaultChecked={checked}
            />
            <span>{text}</span>
        </label>
    );
};

export default ProposalRadio;
