import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm, change } from 'redux-form';
import { api } from '../../../utils/api';
import _ from 'lodash';
import Swal from 'sweetalert2';

const LOADER = 'PELICULAS_LOADER';
const PROXIMAMENTE = 'PELICULAS_PROXIMAMENTE';
const ESTRENOS = 'PELICULAS_ESTRENOS';
const FUNCIONES = 'PELICULAS_FUNCIONES';
const PAGE = 'PELICULAS_PAGE';
const ITEM = 'PELICULAS_ITEM';
const VIDEOS = 'PELICULAS_VIDEOS';
const IMAGENES = 'PELICULAS_IMAGENES';
const BUTACAS = 'PELICULAS_BUTACAS';
const COMIDA = 'PELICULAS_COMIDA';

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

const getFuncion = (id, form=null) => (dispatch) => {
    dispatch(setLoader(true));
    api.get(`funciones/${id}`).then(response => {
        dispatch(setData(response, ITEM));
        if (response.pelicula && !form) {
            dispatch(getVideos(response.pelicula.id))
            dispatch(getImagenes(response.pelicula.id))
        }
        if (form) {
            const { sala: { filas, asientos_fila, asientos }, butacas } = response;
            const filas_butacas = [];
            for (let i = 0; i < asientos; i += asientos_fila) {
                const cols_butacas = [];
                for (let j = i; j < i + asientos_fila; j += 1) {
                    cols_butacas.push({...butacas[j], selected: false});
                }
                filas_butacas.push(cols_butacas);
            }

            console.log('array ', filas_butacas);
            //setear
            dispatch(setData(filas_butacas, BUTACAS))
        }
    }).finally(() => {
        dispatch(setLoader(false));
    })
};

const getVideos = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.get('peliculas/trailers', { id }).then(response => {
        if (response.results)
        dispatch(setData(response.results, VIDEOS));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};

const getImagenes = (id) => (dispatch) => {
    dispatch(setLoader(true));
    api.get('peliculas/imagenes', { id }).then(response => {
        if (response.backdrops)
        dispatch(setData(response.backdrops, IMAGENES));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};

const comprarBoletos = (data, close=null) => (dispatch) => {
    dispatch(setLoader(true));
    api.post('compras', data).then(response => {
        console.log("response ", response);
        window.open(response.tickets, '_blank')
        Swal.fire({
            title: 'Compra realizada con exito',
            text: 'Si no ves la descarga de tus boletos, da click en el botón de descargar.',
            type: 'success',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Descargar',
            cancelButtonText: 'Cerrar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                window.open(response.tickets, '_blank');
            }
            close()
        });
        // openModal(response)
    }).catch(error => {
        console.log("error ", error)
        Swal.fire(
            'Error!',
            'Error al comprar tus boletos, intentalo más tarde',
            'error'
        )
    }).finally(() => {
        dispatch(setLoader(false));
    })
}

const changeButaca = (fil, col) => (dispatch, getStore) => {
    console.log("Se va seleccionar perros")
    const { butacas } = getStore().peliculas;
    const { values } = getStore().form.CompraForm;
    const asientos = values ? values.cantidad ? values.cantidad : 0 : 0;
    let seleccionados = 0;
    butacas.forEach(item => {
        item.forEach(_item => {
            if (_item.selected)
                seleccionados += 1
        })
    });
    if (seleccionados < asientos && !butacas[fil][col].selected) {
        // Podemos marcarlo
        butacas[fil][col].selected = true;
        console.log("butacas" , butacas)
    } else {
        butacas[fil][col].selected = false;
    }
    dispatch(setData(butacas, BUTACAS));
};

const getComida = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get('comidas').then(response => {
        dispatch(setData(response, COMIDA));
    }).finally(() => {
        dispatch(setLoader(false));
    })
};

const agregarCarrito = (item, cantidad) => (dispatch, getStore) => {
    const form = getStore().form.CompraForm;
    let dulceria = [];
    if (form.values && form.values.dulceria)
        dulceria = form.values.dulceria;
    const index = _.findIndex(dulceria, { id: item.id });
    if (index != -1) {
        const item = dulceria[index];
        dulceria[index] = {...item, cantidad: item.cantidad + cantidad}
    }
    else {
        dulceria.push({...item, cantidad});
    }
    dispatch(change('CompraForm', 'dulceria', dulceria));
}

const eliminarCarrito = (index) => (dispatch, getStore) => {
    const form = getStore().form.CompraForm;
    let dulceria = [];
    if (form.values && form.values.dulceria)
        dulceria = form.values.dulceria;
    
    dulceria.splice(index, 1);
    dispatch(change('CompraForm', 'dulceria', dulceria));
}

const resetCarritoForm = () => (dispatch) => {
    dispatch(change('ComidaForm', 'cantidad', 0));
}


export const actions = {
    getProximamente,
    getEstrenos,
    getFunciones,
    getFuncion,
    changeButaca,
    comprarBoletos,
    getComida,
    agregarCarrito,
    eliminarCarrito,
    resetCarritoForm,
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
    [ITEM]: (state, { data }) => {
        return {
            ...state,
            item: data,
        };
    },
    [VIDEOS]: (state, { data }) => {
        return {
            ...state,
            videos: data,
        };
    },
    [IMAGENES]: (state, { data }) => {
        return {
            ...state,
            imagenes: data,
        };
    },
    [BUTACAS]: (state, { data }) => {
        return {
            ...state,
            butacas: data,
        };
    },
    [COMIDA]: (state, { data }) => {
        return {
            ...state,
            comida: data,
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
    item: {},
    videos: [],
    imagenes: [],
    butacas: [],
    comida: [],
};

export default handleActions(reducers, initialState);