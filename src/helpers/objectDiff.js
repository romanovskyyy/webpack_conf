import { isEqual, isObject, transform } from 'lodash';

export const objectDiff = (object, base) => {
    return transform(object, (result, value, key) => {
        if (!isEqual(value, base[key])) {
            result[key] =
                isObject(value) && isObject(base[key]) ? objectDiff(value, base[key]) : value;
        }
    });
};
