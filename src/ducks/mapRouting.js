const GET_ROUTE_INFO = 'GET_ROUTE_INFO';
const UPD_DRAGGED_LOC = 'UPD_DRAGGED_LOC';
const SET_SELECTED_BUSINESS_LOC = 'SET_SELECTED_BUSINESS_LOC';
const UPD_ROUTE_TYPE = 'UPD_ROUTE_TYPE';
const NOTHING_FOUND = 'NOTHING_FOUND';
const SAVE_CURRENT_DRAGGED_LOC = 'SAVE_CURRENT_DRAGGED_LOC';
export const RESET_ROUTE_DATA = 'RESET_ROUTE_DATA';
export const RESET_DRAGGED_LOC = 'RESET_DRAGGED_LOC';

const initialState = {
    routeInfo: null,
    draggedLoc: null,
    selectedBusinessLoc: null,
    wasFound: false,
    routeType: 'car',
    lastSuccessDragLoc: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ROUTE_INFO:
            return {
                ...state,
                routeInfo: payload
            };
        case RESET_ROUTE_DATA:
            return {
                ...initialState
            };
        case RESET_DRAGGED_LOC:
            return {
                ...state,
                draggedLoc: null,
                lastSuccessDragLoc: null
            };
        case UPD_DRAGGED_LOC:
            return {
                ...state,
                draggedLoc: payload
            };
        case NOTHING_FOUND:
            return {
                ...state,
                wasFound: payload
            };
        case SAVE_CURRENT_DRAGGED_LOC:
            return {
                ...state,
                lastSuccessDragLoc: payload
            };

        case UPD_ROUTE_TYPE:
            return {
                ...state,
                routeType: payload
            };
        case SET_SELECTED_BUSINESS_LOC: {
            return {
                ...state,
                selectedBusinessLoc: payload
            };
        }

        default:
            return state;
    }
};

export const getRouteInfo = (payload) => ({ type: GET_ROUTE_INFO, payload });
export const updDraggedLoc = (payload) => ({ type: UPD_DRAGGED_LOC, payload });
export const updRouteType = (payload) => ({ type: UPD_ROUTE_TYPE, payload });
export const wasRouteFound = (payload) => ({ type: NOTHING_FOUND, payload });
export const draggedLocCheckpoint = (payload) => ({ type: SAVE_CURRENT_DRAGGED_LOC, payload });
export const restoreDraggedLoc = () => (dispatch, getState) => {
    const lastSuccessDragLoc = getState().mapRouting.lastSuccessDragLoc;
    if (lastSuccessDragLoc) {
        const successDragLoc = { ...lastSuccessDragLoc };
        dispatch(updDraggedLoc(successDragLoc));
    }
};
export const setSelectedBusinessLocation = (payload) => ({
    type: SET_SELECTED_BUSINESS_LOC,
    payload
});
