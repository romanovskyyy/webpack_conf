import { handleFetch } from '../helpers/fetch';
import { SubmissionError, initialize } from 'redux-form';
import { handleError } from '../helpers/errors';
import { updateAvatarPreview, resetUserData } from './editUser';
import { geoLocation } from './explore';
import { registerInitialData, loginInitialData, forgetInitialData } from '../helpers/common';

const GET_GEOLOCATION = 'GET_GEOLOCATION';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const NEXT_STEP = 'NEXT_REG_STEP';
const PREV_STEP = 'PREV_REG_STEP';
const RESET_STEP = 'RESET_REG_STEP';
const IS_AUTH = 'IS_AUTH';
const LOGOUT = 'LOGOUT';
const GET_SOCIAL_LINKS = 'GET_SOCIAL_LINKS';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const GET_USER_DATA = 'GET_USER_DATA';
const HIDE_PRELOADER = 'HIDE_PRELOADER';
const SHOW_PRELOADER = 'SHOW_PRELOADER';
const FORGOT_PASSWORD_CHANGE_STEP = 'FORGOT_PASSWORD_CHANGE_STEP';
const UPDATE_AVATAR = 'UPDATE_AVATAR';

const initialState = {
    step: 1,
    forgotPassStep: 1,
    isAuth: false,
    socialLinks: {
        fb: '',
        google: '',
        twitter: ''
    },
    showModal: false,
    userData: null,
    geoLocation: {
        latitude: 24.453962,
        longitude: 54.42337
    },
    showPreloader: true
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                step: 5
            };
        case NEXT_STEP:
            return {
                ...state,
                step: state.step + 1
            };
        case PREV_STEP:
            return {
                ...state,
                step: state.step - 1
            };
        case RESET_STEP:
            return {
                ...state,
                step: 1,
                forgotPassStep: 1
            };
        case IS_AUTH:
            return {
                ...state,
                isAuth: true
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false
            };

        case GET_GEOLOCATION:
            return {
                ...state,
                geoLocation: payload
            };
        case GET_SOCIAL_LINKS:
            return {
                ...state,
                socialLinks: {
                    fb: payload.facebookUrl,
                    google: payload.googleUrl,
                    twitter: payload.twitterUrl
                }
            };
        case GET_USER_DATA:
            return {
                ...state,
                userData: payload
            };
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            };
        case HIDE_PRELOADER:
            return {
                ...state,
                showPreloader: false
            };
        case SHOW_PRELOADER:
            return {
                ...state,
                showPreloader: true
            };
        case FORGOT_PASSWORD_CHANGE_STEP:
            return {
                ...state,
                forgotPassStep: payload
            };
        case UPDATE_AVATAR:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    avatar: {
                        ...state.userData.avatar,
                        storageUrl: payload
                    }
                }
            };
        default:
            return state;
    }
};

export const nextStepAction = () => ({ type: NEXT_STEP });
export const prevStepAction = () => ({ type: PREV_STEP });
export const resetStepAction = () => ({ type: RESET_STEP });
export const showModalAction = () => ({ type: SHOW_MODAL });
export const hideModalAction = () => ({ type: HIDE_MODAL });
export const hidePreloaderAction = () => ({ type: HIDE_PRELOADER });
export const showPreloaderAction = () => ({ type: SHOW_PRELOADER });
export const updateAvatar = (payload) => ({ type: UPDATE_AVATAR, payload });

export const getGeolocation = () => (dispatch, getState) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
        const location = { latitude: coords.latitude, longitude: coords.longitude };
        if (getState().auth.isAuth) {
            dispatch(sendGeolocation(location));
        }
        dispatch(geoLocation(location));
        dispatch({
            type: GET_GEOLOCATION,
            payload: location
        });
    });
};
const sendGeolocation = (location) => () => {
    return handleFetch(`user/geo-location`, 'PUT', location)
        .then((res) => {
            if (!res.success) {
                throw res;
            }
        })
        .catch((e) => console.error(e));
};

const resetAll = () => (dispatch) => {
    dispatch(initialize('register', registerInitialData));
    dispatch(initialize('login', loginInitialData));
    dispatch(initialize('forgotPass', forgetInitialData));
};

export const hideAndResetModel = () => (dispatch) => {
    dispatch(resetAll());
    dispatch(hideModalAction());
    setTimeout(() => dispatch(resetStepAction()), 300);
};

//creators
export const login = (value) => (dispatch, getState) => {
    return handleFetch('sign-in', 'POST', value)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: IS_AUTH });
                dispatch(getUserData());
                dispatch(sendGeolocation({ ...getState().auth.geoLocation }));
                dispatch(resetAll());
                dispatch(hideModalAction());
            }
        })
        .catch((e) => {
            if (typeof e === 'object') {
                throw new SubmissionError({ _error: 'Email ' + handleError(e.email) });
            } else {
                throw new SubmissionError({ _error: handleError(e) });
            }
        });
};
export const register = (value) => (dispatch) => {
    return handleFetch('sign-up', 'POST', value)
        .then((res) => {
            if (!res.success) {
                throw new SubmissionError({});
            } else {
                dispatch(resetAll());
                dispatch({ type: REGISTER_SUCCESS });
            }
        })
        .catch((e) => console.error(e.message));
};

export const getSocialLinks = () => (dispatch) => {
    return handleFetch('auth/urls', 'GET')
        .then((res) => {
            if (!res.success) {
                throw new SubmissionError({});
            } else {
                dispatch({ type: GET_SOCIAL_LINKS, payload: res });
            }
        })
        .catch((e) => console.warn(e.message));
};

export const getUserData = () => (dispatch) => {
    return handleFetch('profile/logged', 'GET', undefined, false)
        .then((res) => {
            if (!res.success) {
                dispatch(hidePreloaderAction());
                throw new SubmissionError({});
            } else {
                if (res.profile.avatar) {
                    dispatch(updateAvatarPreview(res.profile.avatar.storageUrl, true));
                }
                dispatch({ type: IS_AUTH });
                dispatch({ type: GET_USER_DATA, payload: res.profile });
                dispatch(hidePreloaderAction());
            }
        })
        .catch((e) => console.error(e.message));
};

export const forgotPassword = (val) => (dispatch) => {
    return handleFetch('forgot-password', 'POST', val)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: FORGOT_PASSWORD_CHANGE_STEP, payload: 2 });
            }
        })
        .catch((e) => {
            if (typeof e === 'object') {
                throw new SubmissionError({ _error: "Email isn't valid" });
            } else {
                switch (e) {
                    case 'USER_NOT_FOUND':
                        throw new SubmissionError({ _error: "User don't find" });
                    case 'SOCIAL_ACCOUNT':
                        throw new SubmissionError({
                            _error: 'You should login via your social network'
                        });
                }
            }
        });
};

export const changePassword = (val, token) => (dispatch) => {
    val.token = token;
    return handleFetch('change-password', 'POST', val)
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                document.location.href = '/';
            }
        })
        .catch((e) => {
            throw new SubmissionError({ _error: handleError(e) });
        });
};

export const logout = () => (dispatch) => {
    return handleFetch('logout', 'GET', undefined, false)
        .then((res) => {
            if (!res.success) {
                throw new Error();
            } else {
                dispatch({ type: LOGOUT });
                dispatch(resetStepAction());
                dispatch(resetAll());
                dispatch(resetUserData());
            }
        })
        .catch((e) => console.error(e.message));
};
