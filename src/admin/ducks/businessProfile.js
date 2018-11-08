import { handleFetch } from '../helpers/fetch';
import { handleErrorType } from '../helpers/errors';
import { setAreaLabel, setCityLabel } from './addBusiness';

const GET_BUSINESS_DATA = 'GET_BUSINESS_DATA';
const TOGGLE_MODAL = 'TOGGLE_BUSINESS_MODAL';
export const CLEAR_PROFILE = 'CLEAR_BUSINESS_PROFILE';
const DELETE_COVER_PHOTO = 'DELETE_COVER_PHOTO';
const DELETE_DOCUMENT = 'DELETE_DOCUMENT';

const initialState = {
    showModal: false,
    business: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_BUSINESS_DATA:
            return {
                ...state,
                business: payload
            };
        case CLEAR_PROFILE:
            return {
                ...initialState
            };

        case TOGGLE_MODAL:
            return {
                ...state,
                showModal: payload
            };
        case DELETE_COVER_PHOTO:
            return {
                ...state,
                business: {
                    ...state.business,
                    coverPhoto: payload
                }
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                business: {
                    ...state.business,
                    files: payload
                }
            };

        default:
            return state;
    }
};

export const setBusinessData = (payload) => ({ type: GET_BUSINESS_DATA, payload });
export const toggleModal = (payload) => ({ type: TOGGLE_MODAL, payload });
export const clearProfile = () => ({ type: CLEAR_PROFILE });

//creators
export const getBusinessData = (id) => (dispatch) => {
    return handleFetch(`business/${id}`, 'GET', undefined, false)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch(setAreaLabel(res.business.area.name));
                dispatch(setCityLabel(res.business.city.name));
                dispatch(setBusinessData(res.business));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const deleteCoverPhoto = (id) => (dispatch, getState) => {
    const coverPhotos = [...getState().businessProfile.business.coverPhoto];
    const updCoverPhoto = coverPhotos.filter((item) => item.id !== id);

    return handleFetch('business/file', 'DELETE', { ids: [id] }).then((res) => {
        if (res.success) {
            dispatch({ type: DELETE_COVER_PHOTO, payload: updCoverPhoto });
        }
    });
};

export const deleteDocument = (id) => (dispatch, getState) => {
    const documents = [...getState().businessProfile.business.files];
    const updDocuments = documents.filter((item) => item.id !== id);

    return handleFetch('business/file', 'DELETE', { ids: [id] }).then((res) => {
        if (res.success) {
            dispatch({ type: DELETE_DOCUMENT, payload: updDocuments });
        }
    });
};

export const deleteGalleryFile = (id) => (dispatch, getState) => {
    return handleFetch('business/file', 'DELETE', { ids: [id] }).then((res) => res.success);
};
