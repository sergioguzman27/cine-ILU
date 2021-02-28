import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TMDB_IMAGENES } from '../../utils/constants';
import { ClockCircleFilled, CalendarFilled, CustomerServiceFilled } from '@ant-design/icons';
import { NumberField } from '../../components/Fields/Inputs';
import { RenderCurrency } from '../../components/Fields/ReadFields';
import Sala from '../../components/Fields/Sala';
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
    const { item, handleSubmit, cantidad } = props;

    const getDuracion = (fecha_inicio, fecha_fin) => {
        const inicio = moment(fecha_inicio);
        const fin = moment(fecha_fin);
        const dif = fin - inicio;
        const fecha = moment("00:00", "HH:mm").add(dif, 'ms');
        return `${fecha.format('h')}hr ${fecha.format('mm')}min`;
    }

    const getTotal = () => {
        const precio = item.precio ? parseFloat(item.precio) : 0;
        return precio * (cantidad || 0)
    }

    return (
        <form name="CompraForm" className="funcion-contenido" onSubmit={handleSubmit}>
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
                                <RenderCurrency value={getTotal()} className="h4 alter1" />
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-1 w-100 mt-5 px-4">
                <span className="bold alter1 mb-2">Ahora selecciona tus asientos</span>
                <Sala butacas={props.butacas} changeButaca={props.changeButaca}  />
            </div>

            <div className="btn-box-left flex-column flex-md-row mt-5 px-4">
                <button className="flex-1 btn btn-secondary mr-md-5" type="button">Cancelar</button>
                <button className="flex-1 btn btn-primary mt-3 mt-md-0" type="submit">Adquirir</button>
                <div className="d-none d-md-flex flex-4"></div>
            </div>
        </form>
    )
}

const selector = formValueSelector('CompraForm');


const mstp = state => {
    const cantidad = selector(state, 'cantidad');

    return {
        cantidad,
    }
};

export default reduxForm({
    form: 'CompraForm',
    validate: validate,
})( connect(mstp, null)(CompraForm));