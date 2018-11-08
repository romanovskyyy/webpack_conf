import { handleFetch, elasticFetch } from '../helpers/fetch';
import { debounce } from 'lodash-es';

const MAIN_SEARCH = 'MAIN_SEARCH';
const BY = 'BY';
const AREA = 'AREA';
const CATEGORY = 'CATEGORY';
const PAGE = 'PAGE';
const TAG = 'TAG';
const RESET_SEARCH = 'RESET_SEARCH';
const GET_SEARCH_VALUE = 'GET_SEARCH_VALUE';
const SET_GEOLOCATION = 'SET_GEOLOCATION';
const RESULT = 'RESULT';
export const RESET_BUSINESS = 'RESUT_BUSINESS_RESULT';

const initialState = {
    search: {
        search: '',
        by: '',
        area: '',
        category: '',
        page: '1',
        tag: [],
        lat: 24.453962,
        lon: 54.42337
    },
    result: {
        business: []
    },
    isPristine: true
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RESET_SEARCH:
            return {
                ...state,
                search: {
                    ...initialState.search,
                    lat: state.search.lat,
                    lon: state.search.lon
                }
            };
        case GET_SEARCH_VALUE:
            return {
                ...state,
                search: payload
            };

        case MAIN_SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    search: payload
                }
            };
        case BY:
            return {
                ...state,
                search: {
                    ...state.search,
                    by: payload
                }
            };
        case AREA:
            return {
                ...state,
                search: {
                    ...state.search,
                    area: payload
                }
            };
        case CATEGORY:
            return {
                ...state,
                search: {
                    ...state.search,
                    category: payload
                }
            };
        case PAGE: {
            return {
                ...state,
                search: {
                    ...state.search,
                    page: String(payload)
                }
            };
        }
        case TAG: {
            return {
                ...state,
                search: {
                    ...state.search,
                    tag: payload
                }
            };
        }
        case SET_GEOLOCATION: {
            return {
                ...state,
                search: {
                    ...state.search,
                    lat: payload.latitude,
                    lon: payload.longitude
                }
            };
        }

        case RESULT: {
            return {
                ...state,
                isPristine: false,
                result: payload
            };
        }
        case RESET_BUSINESS: {
            return {
                ...state,
                result: {
                    business: []
                }
            };
        }
        default:
            return state;
    }
};

export const changeMainSearch = (payload) => ({ type: MAIN_SEARCH, payload });
export const changeBy = (payload) => ({ type: BY, payload });
export const changeArea = (payload) => ({ type: AREA, payload });
export const changeCategory = (payload) => ({ type: CATEGORY, payload });
export const changePage = (payload) => ({ type: PAGE, payload });
export const resetSearch = () => ({ type: RESET_SEARCH });
export const geoLocation = (payload) => ({ type: SET_GEOLOCATION, payload });
export const getSearchValue = (payload) => {
    const updPayload = { ...payload };
    if (updPayload.hasOwnProperty('tag') && typeof updPayload.tag === 'string') {
        updPayload.tag = [payload.tag];
    }
    return { type: GET_SEARCH_VALUE, payload: updPayload };
};
export const changeTag = (payload) => {
    if (typeof payload === 'string') {
        return { type: TAG, payload: [payload] };
    }

    return { type: TAG, payload };
};

//creators
const searchReq = debounce((dispatch, value) => {
    return (false
        ? elasticFetch(`elastic/search?${value}`, 'GET')
        : handleFetch(`elastic/search?${value}`, 'GET')
    )
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch({ type: RESULT, payload: res.resp });
            }
        })
        .catch((e) => {});
}, 400);

export const asyncSearchDebounced = (value) => (dispatch) => searchReq(dispatch, value);
