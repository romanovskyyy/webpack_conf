import { handleFetch } from '../helpers/fetch';
import { handleErrorType } from '../helpers/errors';

const GET_CATEGORY = 'GET_CATEGORY';
const GET_CATEGORY_WITH_CHILDREN = 'GET_CATEGORY_WITH_CHILDREN';
const GET_CATEGORY_BY_RATING = 'GET_CATEGORY_BY_RATING';
const GET_SUBCATEGORY = 'GET_SUBCATEGORY';
const GET_TAGS = 'GET_TAGS';
const GET_AREA = 'GET_AREA';
const GET_CITY = 'GET_CITY';
const GET_SERVICES = 'GET_SERVICES';
const GET_ALL_TAGS = 'GET_ALL_TAGS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_SUBCATEGORY = 'DELETE_SUBCATEGORY';

const initialState = {
    tags: [],
    area: [],
    allTags: [],
    city: [],
    category: [],
    categoryWithChildren: [],
    categoryByRating: [],
    subcategory: [],
    services: [],
    products: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: payload
            };
        case GET_CATEGORY_BY_RATING:
            return {
                ...state,
                categoryByRating: payload
            };
        case GET_CATEGORY_WITH_CHILDREN:
            return {
                ...state,
                categoryWithChildren: payload
            };
        case GET_TAGS:
            return {
                ...state,
                tags: payload
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case GET_ALL_TAGS:
            return {
                ...state,
                allTags: payload
            };
        case GET_SERVICES:
            return {
                ...state,
                services: payload
            };
        case GET_CITY:
            return {
                ...state,
                city: payload
            };
        case GET_AREA:
            return {
                ...state,
                area: payload
            };
        case GET_SUBCATEGORY:
            return {
                ...state,
                subcategory: payload
            };
        case DELETE_SUBCATEGORY:
            return {
                ...state,
                subcategory: []
            };
        default:
            return state;
    }
};

export const getCategory = (payload) => ({ type: GET_CATEGORY, payload });
export const getCategoryWithChildren = (payload) => ({ type: GET_CATEGORY_WITH_CHILDREN, payload });
export const getCategoryByRating = (payload) => ({ type: GET_CATEGORY_WITH_CHILDREN, payload });
export const getSubcategory = (payload) => ({ type: GET_SUBCATEGORY, payload });
export const getTags = (payload) => ({ type: GET_TAGS, payload });
export const getAllTags = (payload) => ({ type: GET_ALL_TAGS, payload });
export const getCity = (payload) => ({ type: GET_CITY, payload });
export const getArea = (payload) => ({ type: GET_AREA, payload });
export const getServices = (payload) => ({ type: GET_SERVICES, payload });
export const getProducts = (payload) => ({ type: GET_PRODUCTS, payload });
export const deleteSubcategories = () => ({ type: DELETE_SUBCATEGORY });

export const addSubcategoryToCategory = (payload) => (dispatch, getState) => {
    const categoryArr = getState().dropdown.category;
    const isInclude = categoryArr.some((item) => item.value === payload.value);
    if (!isInclude) {
        categoryArr.push(payload);
        dispatch(getCategory(categoryArr));
    }
};

//creators
export const getCategoryAction = (id = '') => (dispatch) => {
    return handleFetch(`category?children=false${id}`, 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({ value: item.id, label: item.name }));
                if (id) {
                    dispatch(getSubcategory(updArr));
                    return;
                }
                dispatch(getCategory(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getCategoryWithChildrenAction = () => (dispatch) => {
    return handleFetch(`category?children=true`, 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch(getCategoryWithChildren(res.payload));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getCategoryByRatingAction = () => (dispatch) => {
    return handleFetch(`category?byRating=true`, 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                dispatch(getCategoryByRating(res.payload));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getTagsAction = () => (dispatch) => {
    return handleFetch('tag?type=MAIN', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name,
                    color: item.color
                }));
                dispatch(getTags(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getProductsAction = () => (dispatch) => {
    return handleFetch('product-group', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name
                }));
                dispatch(getProducts(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getAllTagsAction = () => (dispatch) => {
    return handleFetch('tag', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name,
                    color: item.color
                }));
                dispatch(getAllTags(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getServicesAction = () => (dispatch) => {
    return handleFetch('service', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name,
                    icon: item.icon
                }));
                dispatch(getServices(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getAreaAction = (id = '') => (dispatch) => {
    return handleFetch(`area?city=${id}`, 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name
                }));
                dispatch(getArea(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};

export const getCityAction = () => (dispatch) => {
    return handleFetch('city', 'GET')
        .then((res) => {
            if (!res.success) {
                throw res.payload;
            } else {
                const updArr = res.payload.map((item) => ({
                    value: item.id,
                    label: item.name
                }));
                dispatch(getCity(updArr));
            }
        })
        .catch((e) => handleErrorType(e));
};
