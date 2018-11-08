import { handleFetch, filesFetch } from '../helpers/fetch';
import { handleErrorType } from '../helpers/errors';
import { getUserData } from './auth';

const UPDATE_AVATAR_PREVIEW = 'UPDATE_AVATAR_PREVIEW';
const UPDATE_AVATAR_FILE = 'UPDATE_AVATAR_FILE';
const RESET_USER_DATA = 'RESET_USER_DATA';

const initialState = {
    avatarPreview: '',
    avatarFile: {},
    isPristine: true
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RESET_USER_DATA:
            return { ...initialState };
        case UPDATE_AVATAR_PREVIEW:
            return {
                ...state,
                avatarPreview: payload.url,
                isPristine: payload.isPristine
            };
        case UPDATE_AVATAR_FILE:
            return {
                ...state,
                avatarFile: payload
            };
        default:
            return state;
    }
};

export const resetUserData = () => ({ type: RESET_USER_DATA });
export const updateAvatarPreview = (payload, bool) => ({
    type: UPDATE_AVATAR_PREVIEW,
    payload: { url: payload, isPristine: bool }
});
export const updateAvatarFile = (payload) => ({ type: UPDATE_AVATAR_FILE, payload });

//creators
export const uploadImage = () => (dispatch, getState) => {
    const fd = getState().editUser.avatarFile;
    return filesFetch('user/avatar', fd)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch(getUserData());
            }
        })
        .catch((e) => handleErrorType(e));
};

export const saveChanges = (value) => (dispatch) => {
    dispatch(uploadImage());
    return handleFetch('user/profile', 'PUT', value)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                alert('Changes were successfully changed');
                dispatch(getUserData());
            }
        })
        .catch((e) => handleErrorType(e));
};

export const updatePassword = (value) => () => {
    return handleFetch('user/password', 'PUT', value)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                alert('Changes were successfully changed');
            }
        })
        .catch((e) => handleErrorType(e));
};
