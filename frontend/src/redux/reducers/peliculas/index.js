import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from '../../../utils/api';

const LOADER = 'PELICULAS_LOADER';
const PROXIMAMENTE = 'PELICULAS_PROXIMAMENTE';
const ESTRENOS = 'PELICULAS_ESTRENOS';
const FUNCIONES = 'PELICULAS_FUNCIONES';

// ------------------------------------
// Pure Actions
// ------------------------------------
export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = (data, type=PROXIMAMENTE) => ({
    type,
    data,
})


// ------------------------------------
// Actions
// ------------------------------------

const getProximamente = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get('peliculas/proximamente').then(response => {
        dispatch(setData(response));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};

const getEstrenos = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get('peliculas/estrenos').then(response => {
        dispatch(setData(response, ESTRENOS));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};


export const actions = {
    getProximamente,
    getEstrenos,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [PROXIMAMENTE]: (state, { data }) => {
        return {
            ...state,
            proximamente: data,
        };
    },
    [ESTRENOS]: (state, { data }) => {
        return {
            ...state,
            estrenos: data,
        };
    },
    [FUNCIONES]: (state, { data }) => {
        return {
            ...state,
            funciones: data,
        };
    },
};

export const initialState = {
    loader: false,
    proximamente: [],
    estrenos: [],
    funciones: {
        count: 0,
        results: []
    },
};

export default handleActions(reducers, initialState);