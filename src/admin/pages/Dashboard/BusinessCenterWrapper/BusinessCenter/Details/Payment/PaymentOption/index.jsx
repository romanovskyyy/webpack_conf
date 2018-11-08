import React, { Component } from 'react';

export default class PaymentOption extends Component {
    handleChange = (e) => {
        const { input } = this.props;
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
    render() {
        const { paymentOptions, input } = this.props;

        return paymentOptions.map(({ id, name }) => (
            <li key={id}>
                <label className="default-label">
                    <input
                        type="checkbox"
                        name={id}
                        onChange={this.handleChange}
                        style={{ marginRight: '5px' }}
                        defaultChecked={input.value.includes(id)}
                    />
                    {name}
                </label>
            </li>
        ));
    }
}
