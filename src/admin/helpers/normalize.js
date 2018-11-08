export const phone = (value) =>
    value
        .replace(/[^0-9+]/g, '')
        .replace(/\b\+/g, '')
        .replace(/^(\+)(\+)+/, '$1');

export const specialCharacters = (value) => value.replace(/[^a-zA-Z0-9]/g, '');

export const noPercent = (value) => value.replace(/%/g, '');

export const noWhiteSpace = (value) => value.replace(/\s/g, '');

export const onlyDigits = (val) => val.replace(/[^0-9+]/g, '');

export const onlyDigitsAndDot = (val) => val.replace(/[^0-9.]/g, '');
