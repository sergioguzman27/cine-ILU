import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Button } from 'antd';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { TMDB_IMAGENES } from '../../utils/constants';
import { ClockCircleFilled, CalendarFilled, CustomerServiceFilled } from '@ant-design/icons';
import { NumberField } from '../../components/Fields/Inputs';
import { RenderCurrency } from '../../components/Fields/ReadFields';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarritoDulceria from '../../components/Fields/CarritoDulceria';
import Sala from '../../components/Fields/Sala';
import ModalCarrito from './ModalCarrito';
import moment from 'moment';


const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Campo requerido'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email no valido'
    }
    return errors
}


const CompraForm = (props) => {
    const { item, handleSubmit, cantidad, llevaDulceria } = props;
    const [modal, setModal] = useState(false);
    const [comida, setComida] = useState(null);

    // llevaDulceria();

    const getDuracion = (fecha_inicio, fecha_fin) => {
        const inicio = moment(fecha_inicio);
        const fin = moment(fecha_fin);
        const dif = fin - inicio;
        const fecha = moment("00:00", "HH:mm").add(dif, 'ms');
        return `${fecha.format('h')}hr ${fecha.format('mm')}min`;
    }

    const getTotalBoletos = () => {
        const precio = item.precio ? parseFloat(item.precio) : 0;
        return precio * (cantidad || 0)
    }

    const getTotalDulceria = () => {
        let total = 0;
        if (props.dulceria) {
            props.dulceria.forEach(item => {
                total += item.precio * item.cantidad;
            })
        }
        return total;
    }
    
    const getTotal = () => {
        const boletos = getTotalBoletos();
        const dulceria = getTotalDulceria();
        return boletos + dulceria;
    }

    const cerrarModal = () => {
        props.resetCarritoForm();
        setModal(false);
        setComida(null);
    }

    const abrirModal = (_comida) => {
        setComida(_comida);
        setModal(true);
    }

    const agregarCarrito = (cantidad,) => {
        if (cantidad) {
            console.log("puttoooooo")
            props.agregarCarrito(comida, cantidad);
            cerrarModal();
        }
    }

    // const llevaDulceria = () => {
    //     const hoy = moment(item.fecha_hora_inicio);
    //     console.log("hoy ", hoy.day())
    //     return hoy.day() !== 6;
    // }

    return (
        <form name="CompraForm" className="funcion-contenido" onSubmit={handleSubmit}>
            <ModalCarrito
                modal={modal}
                item={comida}
                cerrarModal={cerrarModal}
                agregarCarrito={agregarCarrito}
            />
            <div className="d-flex flex-md-row flex-column flex-1 w-100 mt-5">
                <div className="d-flex justify-content-center flex-2 px-md-3">
                    <img className="poster" src={`${TMDB_IMAGENES}${item.pelicula.poster_path}`} />
                </div>
                <div className="d-flex flex-column flex-3 px-3 mt-4 mt-md-0">
                    <span className="uppercase danger">Pelicula</span>
                    <h4 className="blanco">{item.pelicula.title}</h4>
                    <div className="datos-pelicula">
                        <span className="text-small mr-3">
                            <ClockCircleFilled className="mr-3" />
                            {getDuracion(item.fecha_hora_inicio, item.fecha_hora_fin)}
                        </span>
                        <span className="text-small mr-3">
                            <CalendarFilled className="mr-3" />
                            {moment(item.fecha_hora_inicio).format("DD-MM-YYYY HH:mm")}
                        </span>
                        <span className="text-small">
                            <CustomerServiceFilled className="mr-3" />
                            {item.sala.nombre}
                        </span>
                    </div>
                    <span className="bold alter1 mb-2">Ingresa la cantidad de tickets que desees</span>

                    <div className="d-flex flex-column flex-1 w-100 mt-2">
                        <div className="d-flex flex-row flex-1">
                            <div className="form-group">
                                <label className="blanco" htmlFor="username">Tickets</label>
                                <Field
                                    name="cantidad"
                                    component={NumberField}
                                    feedBack
                                />
                            </div>
                            <div className="d-none d-md-flex flex-2"></div>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-1 w-100 mt-2">
                        <div className="d-flex flex-column justify-content-between flex-1">
                            <span className='bold blanco'>PRECIO POR ENTRADA</span>
                            <h4 className="primary">
                                <RenderCurrency value={item.precio} className="h4 primary" />
                            </h4>
                        </div>
                        <div className="d-flex flex-column justify-content-between flex-1">
                            <span className='bold blanco'>TOTAL</span>
                            <h4 className="alter1">
                                <RenderCurrency value={getTotalBoletos()} className="h4 alter1" />
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-1 w-100 mt-5 px-4">
                <span className="bold alter1 mb-2">Ahora selecciona tus asientos</span>
                <Sala butacas={props.butacas} changeButaca={props.changeButaca}  />
            </div>

            {/* COMIDA */}


            {llevaDulceria() && (

                <Fragment>
                    <div className="d-flex flex-column flex-1 w-100 mt-5 px-4">
                        <span className="bold alter1 mb-2">Y de paso, ¿no quieres algo de la dulceria?</span>
                        <div className="d-flex flex-row flex-1 px-3 px-md-5 mt-5">
                            <Carousel className="w-100 carousel-responsive" autoPlay={true} infiniteLoop interval={10000}>
                                {props.comida.map((_item, index) => (
                                    <div className="d-flex flex-column flex-md-row flex-1 w-100" key={index}>
                                        <div className="d-flex align-items-center justify-content-center flex-1">
                                            <img  style={{ width: '50%' }}  src={_item.imagen} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center justify-content-center flex-1">
                                            <h4 className="blanco">{_item.nombre}</h4>
                                            <div className="d-flex my-4">
                                                <h5 className='bold blanco'>Precio:</h5>
                                                <h5 className="alter1 ml-4">
                                                    <RenderCurrency value={_item.precio} className="h5 alter1" />
                                                </h5>
                                            </div>
                                            <p className="blanco">{_item.descripcion}</p>
                                            <button className="btn btn-danger" onClick={() => abrirModal(_item)} type="button">Agregar</button>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-1 w-100 mt-5 px-4">
                        <span className="bold alter1 mb-2">Carrito de dulceria</span>
                        {props.dulceria.length ? (
                            <FieldArray
                                name="dulceria"
                                dulceria={props.dulceria}
                                component={CarritoDulceria}
                                eliminarCarrito={props.eliminarCarrito}
                            />
                        ) : (
                            <Empty
                                description={<span className="blanco">Sin snaks agregados</span>}
                            />
                        )}
                    </div>
                </Fragment>
            ) }
            <div className="compra-resumen d-flex flex-column flex-1 mt-5 px-4">
                <span className="bold alter1 mb-2">Detalles de la compra</span>
                <div className="datos-compra">
                    <span className='text-totales bold blanco'>Total Boletos:</span>
                    <span className="text-totales alter1">
                        <RenderCurrency value={getTotalBoletos()} className="text-totales alter1" />
                    </span>
                </div>
                {llevaDulceria() && (
                    <div className="datos-compra">
                        <span className='text-totales bold blanco'>Total Dulcería:</span>
                        <span className="text-totales alter1">
                            <RenderCurrency value={getTotalDulceria()} className="text-totales alter1" />
                        </span>
                    </div>
                )}
                <div className="datos-compra">
                    <span className='text-totales bold blanco'>Total Compra:</span>
                    <span className="text-totales alter1">
                        <RenderCurrency value={getTotal()} className="text-totales alter1" />
                    </span>
                </div>
            </div>

            <div className="btn-box-left flex-column flex-md-row mt-5 px-4">
                <Link to="/funciones" className="flex-1 btn btn-secondary mr-md-5" type="button">Cancelar</Link>
                <button className="flex-1 btn btn-primary mt-3 mt-md-0" type="submit">Adquirir</button>
                <div className="d-none d-md-flex flex-4"></div>
            </div>
        </form>
    )
}

const selector = formValueSelector('CompraForm');


const mstp = state => {
    const cantidad = selector(state, 'cantidad');
    const dulceria = selector(state, 'dulceria');

    return {
        cantidad,
        dulceria,
    }
};

export default reduxForm({
    form: 'CompraForm',
    initialValues: {
        dulceria: []
    },
    validate: validate,
})( connect(mstp, null)(CompraForm));