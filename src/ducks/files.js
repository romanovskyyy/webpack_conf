import { handleFetch, filesFetch } from '../helpers/fetch';
import { change } from 'redux-form';

const RESET = 'RESET_FILES';
const SET_ACCEPTED_FILES = 'SET_ACCEPTED_FILES';
const SET_REJECTED_FILES = 'SET_REJECTED_FILES';
const WAIT_FOR_CROP_FILES = 'WAIT_FOR_CROP_FILES';
const DELETE_ACCEPTED_FILE = 'DELETE_ACCEPTED_FILE';
const DELETE_REJECTED_FILE = 'DELETE_REJECTED_FILE';
const TOGGLE_CROPPER = 'TOGGLE_CROPPER';
const RESET_CROP_FILES = 'RESET_CROP_FILES';

const initialState = {
    acceptedFiles: [],
    rejectedFiles: [],
    forCropFiles: [],
    showCropper: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_REJECTED_FILES:
            return {
                ...state,
                rejectedFiles: [...state.rejectedFiles, ...payload]
            };
        case SET_ACCEPTED_FILES:
            return {
                ...state,
                acceptedFiles: [...state.acceptedFiles, ...payload]
            };
        case WAIT_FOR_CROP_FILES:
            return {
                ...state,
                forCropFiles: payload
            };
        case DELETE_ACCEPTED_FILE:
            return {
                ...state,
                acceptedFiles: payload
            };
        case DELETE_REJECTED_FILE:
            return {
                ...state,
                rejectedFiles: payload
            };
        case TOGGLE_CROPPER:
            return {
                ...state,
                showCropper: payload
            };
        case RESET:
            return {
                ...initialState
            };
        case RESET_CROP_FILES:
            return {
                ...state,
                forCropFiles: []
            };

        default:
            return state;
    }
};

export const setAcceptedFiles = (payload) => ({ type: SET_ACCEPTED_FILES, payload });
export const setRejectedFiles = (payload) => ({ type: SET_REJECTED_FILES, payload });
export const setForCropFiles = (payload) => ({ type: WAIT_FOR_CROP_FILES, payload });
export const deleteAcceptedFile = (payload) => ({ type: DELETE_ACCEPTED_FILE, payload });
export const deleteRejectedFile = (index) => (dispatch, getState) => {
    const updArr = [...getState().files.rejectedFiles];
    updArr.splice(index, 1);
    dispatch({ type: DELETE_REJECTED_FILE, payload: updArr });
};
export const toggleShowCropper = (payload) => ({ type: TOGGLE_CROPPER, payload });
export const resetFiles = () => ({ type: RESET });
export const resetCropFiles = () => ({ type: RESET_CROP_FILES });

//creators
export const deleteFileAction = (index, id, shouldDeleteAll = false, useId = false) => (
    dispatch,
    getState
) => {
    const acceptedFiles = [...getState().files.acceptedFiles];
    if (shouldDeleteAll) {
        const idArr = acceptedFiles.map((item) => item.id);
        return handleFetch('business/file', 'DELETE', { ids: idArr }).then((res) => {
            if (res.success) {
                dispatch(deleteAcceptedFile([]));
            }
        });
    }
    return handleFetch('business/file', 'DELETE', { ids: [id] }).then((res) => {
        if (res.success) {
            acceptedFiles.splice(index, 1);
            dispatch(deleteAcceptedFile(acceptedFiles));
            if (useId) {
                dispatch(updFileInput());
            }
        }
    });
};

export const fetchFilesAction = (fd, useId = false) => (dispatch) => {
    return filesFetch('business/file', fd).then((res) => {
        if (res.success) {
            dispatch(setAcceptedFiles(res.payload.success));
            if (useId) {
                dispatch(updFileInput());
            }
            if (res.payload.fails.length) {
                //TODO Create beautiful modal
                dispatch(setRejectedFiles(res.payload.fails));
                alert(
                    `The following files were rejected ${res.payload.fails
                        .map((file) => file.name)
                        .join(',')}`
                );
            }
        } else {
            alert(() => {
                switch (res.payload) {
                    case 'EXCEEDED_FILE_LIMIT':
                        return 'You exceeded file limit';
                }
            });
        }
    });
};

//TODO: do
const updFileInput = () => (dispatch, getState) => {
    const arr = getState().files.acceptedFiles;
    const idArr = arr.map((item) => item.id);
    dispatch(change('addBusiness', 'files', idArr));
};
