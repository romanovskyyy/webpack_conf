import { handleFetch } from '../helpers/fetch';
import { handleErrorType } from '../helpers/errors';
import { change } from 'redux-form';

const NEXT_STEP = 'NEXT_STEP';
const PREV_STEP = 'PREV_STEP';
const RESET_ALL = 'RESET_ALL';

const SET_AREA_LABEL = 'SET_AREA_LABEL';
const SET_CITY_LABEL = 'SET_CITY_LABEL';
const RESET_LABELS = 'RESET_LABELS';
const SET_ADDED_BUSINESS_INFO = 'SET_ADDED_BUSINESS_INFO';

const initialState = {
    currStep: 1,
    areaLabel: '',
    cityLabel: '',
    addedBusinessInfo: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RESET_ALL:
            return {
                ...state,
                currStep: 1,
                files: []
            };
        case NEXT_STEP:
            return {
                ...state,
                currStep: state.currStep + 1
            };
        case PREV_STEP:
            return {
                ...state,
                currStep: state.currStep - 1
            };

        case SET_AREA_LABEL:
            return {
                ...state,
                areaLabel: payload
            };
        case SET_CITY_LABEL:
            return {
                ...state,
                cityLabel: payload
            };
        case RESET_LABELS:
            return {
                ...state,
                cityLabel: '',
                areaLabel: ''
            };

        case SET_ADDED_BUSINESS_INFO:
            return {
                ...state,
                addedBusinessInfo: payload
            };
        default:
            return state;
    }
};

export const nextStep = () => ({ type: NEXT_STEP });
export const prevStep = () => ({ type: PREV_STEP });
export const resetAll = () => ({ type: RESET_ALL });

export const setAreaLabel = (payload) => ({ type: SET_AREA_LABEL, payload });
export const setCityLabel = (payload) => ({ type: SET_CITY_LABEL, payload });
export const resetLabels = () => ({ type: RESET_LABELS });

//creators

export const submitBusiness = (value) => (dispatch) => {
    const updValue = {
        ...value,
        latitude: Number(value.latitude),
        longitude: Number(value.longitude),
        area: Number(value.area),
        tagIds:
            value.tagIds && value.tagIds.length && value.tagIds[0] === 0 ? undefined : value.tagIds,
        parentCategoryId: Number(value.parentCategoryId),
        city: Number(value.city),
        streetNumber: value.streetNumber ? Number(value.streetNumber) : ''
    };
    return handleFetch('business', 'POST', updValue)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch(nextStep());
                dispatch({ type: SET_ADDED_BUSINESS_INFO, payload: res.payload });
            }
        })
        .catch((e) => handleErrorType(e));
};
