import { handleFetch } from '../helpers/fetch';
import { handleErrorType } from '../helpers/errors';
import { makeOpeningHoursArr } from '../helpers/common';
import { getBusinessData } from './businessProfile';
import { resetFiles } from './files';

const GET_BUSINESS = 'GET_BUSINESS_CENTER_BUSINESS';
const GET_OPENING_HOURS_CHECKBOX = 'GET_OPENING_HOURS_CHECKBOX';
const GET_PAYMENT_OPTIONS = 'GET_PAYMENT_OPTIONS';
export const RESET = 'RESET_BUSINESS_CENTER_BUSINESS';

const initialState = {
    businessList: null,
    openingHours: [],
    paymentOptions: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_BUSINESS:
            return {
                ...state,
                businessList: payload
            };
        case GET_OPENING_HOURS_CHECKBOX:
            return {
                ...state,
                openingHours: payload
            };
        case GET_PAYMENT_OPTIONS:
            return {
                ...state,
                paymentOptions: payload
            };
        case RESET:
            return {
                ...state,
                businessList: null
            };
        default:
            return state;
    }
};

//creators
export const getBusinessList = (page = 1) => (dispatch) => {
    return handleFetch(`business?page=${page}`, 'GET', undefined, false)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: GET_BUSINESS, payload: res.payload });
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getOpeningHoursCheckbox = () => (dispatch) => {
    return handleFetch('tag?type=OPENING_HOURS', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: GET_OPENING_HOURS_CHECKBOX, payload: res.payload });
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getPaymentOptions = () => (dispatch) => {
    return handleFetch('tag?type=PAYMENT_OPTIONS', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: GET_PAYMENT_OPTIONS, payload: res.payload });
            }
        })
        .catch((e) => handleErrorType(e));
};

export const updateGalleryOrder = (id, newIndex) => (dispatch) => {
    return handleFetch('business/file/order', 'PUT', { fileId: id, fileIndex: newIndex })
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                // dispatch({ type: GET_PAYMENT_OPTIONS, payload: res.payload });
            }
        })
        .catch((e) => handleErrorType(e));
};

export const updateBusiness = (val, id) => (dispatch) => {
    let updVal = {
        ...val,
        streetNumber: val.streetNumber ? Number(val.streetNumber) : null,
        openingHours: val.openingHours ? makeOpeningHoursArr(val.openingHours) : undefined,
        parentCategoriesIds: val.parentCategoriesIds
            ? val.parentCategoriesIds.map(Number)
            : undefined,
        subCategoriesIds: val.subCategoriesIds ? val.subCategoriesIds.map(Number) : undefined,
        productGroups: val.productGroups ? val.productGroups.map(Number) : undefined,
        services: val.services ? val.services.map(Number) : undefined
    };
    return handleFetch(`business/${id}`, 'PUT', updVal)
        .then((res) => {
            if (!res.success) {
                alert(res.payload);
                throw res.payload;
            } else {
                dispatch(getBusinessData(res.payload.linkId));
                dispatch(resetFiles());
                alert('Your changes was successfully saved');
            }
        })
        .catch((e) => handleErrorType(e));
};
