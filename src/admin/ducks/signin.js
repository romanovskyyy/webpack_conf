import { handleFetch } from '../helpers/fetch';

const TOGGLE_AUTH = 'TOGGLE_AUTH';

const initialState = {
    isAuth: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_AUTH:
            return { ...state, isAuth: payload };
        default:
            return state;
    }
};

export const toggleAuth = (payload) => ({ type: TOGGLE_AUTH, payload });

export const checkToken = () => () => {
    return handleFetch('check-token', 'GET')
        .then((res) => res.success)
        .catch((err) => console.error(err));
};

export const login = (value) => (dispatch) => {
    return handleFetch('login', 'POST', value)
        .then((res) => {
            if (res.success) {
                dispatch(toggleAuth(true));
            } else {
                return res;
            }
        })
        .catch((err) => console.error('loginError', err));
};
