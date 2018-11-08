import { handleFetch } from './fetch';
import { handleError } from './errors';
import debounce from 'debounce-promise';

export const required = (value) => {
    return value && String(value).trim() ? undefined : 'is required';
};

export const requiredArr = (value) => {
    return value && value.length ? undefined : 'is required';
};

export const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+/i.test(value) ? 'is incorrect' : undefined;

export const password = (value) =>
    value && !/^.*(?=.*\d)(?=.*[a-zA-Z]).*$/.test(value)
        ? 'must contain digits and letters'
        : undefined;

export const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? "passwords don't match" : undefined;

export const newPasswordMatch = (value, allValues) =>
    value !== allValues.newPassword ? "passwords don't match" : undefined;

const minValue = (min) => (value) =>
    value && value.length < min ? `must be at least ${min}` : undefined;

export const minValue8 = minValue(8);
export const minValue2 = minValue(2);

const maxLength = (max) => (value) => {
    return value && value.length > max ? `Must be ${max} or less` : undefined;
};

export const maxLength3 = maxLength(3);

export const asyncValidate = (
    values,
    dispatch,
    { initialValues = { email: '', name: '' } },
    field = 'email'
) => {
    if (field === 'email' && values.email !== initialValues.email) {
        return asyncValidateEmail(values);
    }
    if (field === 'name' && values.name !== initialValues.name) {
        return asyncValidateName(values);
    }
    if (field === 'license' && values.license !== initialValues.license) {
        return asyncValidateLicense(values);
    }
    if (field === 'tradeNumber' && values.tradeNumber !== initialValues.tradeNumber) {
        return asyncValidateTradeNumber(values);
    }
    return Promise.resolve();
};

export const asyncValidateEmail = debounce(
    (val) =>
        handleFetch('check-email', 'POST', {
            email: val.email
        }).then((res) => {
            if (!res.success) {
                if (typeof res.payload === 'string') {
                    throw { email: handleError(res.payload) };
                } else {
                    throw { email: handleError(res.payload.email) };
                }
            }
        }),
    200
);

export const asyncValidateLicense = debounce(
    (val) =>
        handleFetch('business/check/license', 'POST', {
            license: val.license
        }).then((res) => {
            if (!res.success) {
                if (typeof res.payload === 'string') {
                    throw { license: handleError(res.payload) };
                } else {
                    throw { license: handleError(res.payload.license) };
                }
            }
        }),
    200
);

export const asyncValidateName = debounce(
    (val) =>
        handleFetch('check-username', 'POST', {
            name: val.name
        }).then((res) => {
            if (!res.success) {
                if (typeof res.payload === 'string') {
                    throw { name: handleError(res.payload) };
                } else {
                    throw { name: handleError(res.payload.name) };
                }
            }
        }),
    200
);
export const asyncValidateTradeNumber = debounce(
    (val) =>
        handleFetch('business/check/trade-number', 'POST', {
            tradeNumber: val.tradeNumber
        }).then((res) => {
            if (!res.success) {
                if (typeof res.payload === 'string') {
                    throw { tradeNumber: handleError(res.payload) };
                } else {
                    throw { tradeNumber: handleError(res.payload.name) };
                }
            }
        }),
    200
);
export const defaultShouldAsyncValidate = ({
    syncValidationPasses,
    trigger,
    pristine,
    initialized
}) => {
    if (!syncValidationPasses) {
        return false;
    }
    switch (trigger) {
        case 'blur':
        case 'change':
            // blurring or changing
            return true;
        case 'submit':
            // submitting, so only async validate if form is dirty or was never initialized
            // conversely, DON'T async validate if the form is pristine just as it was
            // initialized
            return !pristine || !initialized;
        default:
            return false;
    }
};
