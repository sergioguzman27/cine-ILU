import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from '../../../utils/api';

const LOADER = 'PELICULAS_LOADER';
const PROXIMAMENTE = 'PELICULAS_PROXIMAMENTE';
const ESTRENOS = 'PELICULAS_ESTRENOS';
const FUNCIONES = 'PELICULAS_FUNCIONES';
const PAGE = 'PELICULAS_PAGE';

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
});

const setPage = (page) => ({
    type: PAGE,
    page,
});


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

const getFunciones = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    api.get('funciones', { page }).then(response => {
        dispatch(setData(response, FUNCIONES));
        dispatch(setPage(page));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};


export const actions = {
    getProximamente,
    getEstrenos,
    getFunciones,
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
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
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
    page: 1,
};

export default handleActions(reducers, initialState);