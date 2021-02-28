import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from '../../../utils/api';

const LOADER = 'COMPRA_LOADER';
const ITEM = 'COMPRA_ITEM';

// ------------------------------------
// Pure Actions
// ------------------------------------
export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = (data, type=ITEM) => ({
    type,
    data,
});



// ------------------------------------
// Actions
// ------------------------------------
const getFuncion = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`funciones/${id}`).then(response => {
        dispatch(setData(response, ITEM));
        if (response.pelicula) {
            dispatch(getVideos(response.pelicula.id))
            dispatch(getImagenes(response.pelicula.id))
        }
    }).finally(() => {
        dispatch(setLoader(false));
    })
};


export const actions = {
    getFuncion,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ITEM]: (state, { data }) => {
        return {
            ...state,
            item: data,
        };
    },
};

export const initialState = {
    loader: false,
    item: {},
    asientos: []
};

export default handleActions(reducers, initialState);