import React from 'react';

const Checkbox = ({ openHours = [], input }) => {
    const handleChange = (e) => {
        const itemId = Number(e.target.name);
        const updArr = [...input.value];
        const itemIndex = updArr.indexOf(itemId);

        if (itemIndex !== -1) {
            updArr.splice(itemIndex, 1);
        } else {
            updArr.push(itemId);
        }
        input.onChange(updArr);
    };
    return (
        <ul>
            {openHours.map(({ id, name }) => (
                <li key={id}>
                    <label className="default-label">
                        <input
                            type="checkbox"
                            onChange={handleChange}
                            name={id}
                            defaultChecked={input.value.includes(id)}
                        />
                        &nbsp;
                        {name}
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default Checkbox;
