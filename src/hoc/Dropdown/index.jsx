import React, { Component } from 'react';

const withDropdown = (props) => (Comp) => {
    return class extends Component {
        componentDidMount = () => {
            const { className, change } = props;
            const { meta, dispatch } = this.props;
            let myDispatch;
            if (meta) {
                myDispatch = meta.dispatch;
            } else {
                myDispatch = dispatch;
            }

            $(`${className}`).dropdown({
                clearable: false,
                match: 'text',
                forceSelection: false,
                fullTextSearch: true,
                onChange: (value) => {
                    this.handleChangeIcon();
                    change(value)(myDispatch);
                }
            });

            setTimeout(() => {
                const icon = $(`${className} .icon`);
                icon[0].addEventListener('click', this.handleClearValue);
            }, 10);
        };

        componentDidUpdate = (prevProps) => {
            if (prevProps.savedValue !== this.props.savedValue) {
                this.handleUpdateValue();
            }
        };

        handleUpdateValue = () => {
            const { className } = props;
            const { savedValue = '' } = this.props;
            $(className).dropdown('refresh');
            setTimeout(() => {
                $(className).dropdown('set selected', savedValue);
                this.handleChangeIcon();
            }, 10);
        };

        componentWillUnmount = () => {
            const { className } = props;
            const icon = $(`${className} .icon`);

            $(`${className}`).dropdown('destroy');
            icon[0].removeEventListener('click', this.handleClearValue);
        };

        handleChangeIcon = () => {
            const { className, clearable = true } = props;
            const icon = $(`${className} .icon`);
            const value = $(`${className}`).dropdown('get value');

            if (value && clearable) {
                icon[0].classList.add('clear');
            } else {
                icon[0].classList.remove('clear');
            }
        };

        handleClearValue = (e) => {
            const { className } = props;
            const icon = $(`${className} .icon`);
            if (icon[0].classList.contains('clear')) {
                e.stopPropagation();
                $(`${className}`).dropdown('clear');
                $(`${className}`).dropdown('refresh');
                $(`${className} input.search`).val('');
            }
        };

        render() {
            return <Comp {...this.props} />;
        }
    };
};

export default withDropdown;
