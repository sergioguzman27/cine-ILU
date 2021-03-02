import React from 'react';
import { Link } from 'react-router-dom';
import { TMDB_IMAGENES } from '../../utils/constants';
import { RenderCurrency } from '../../components/Fields/ReadFields';
import moment from 'moment';

const CardFuncion = (props) => {
    const {id, poster, titulo, fecha_inicio, fecha_fin, sala, precio } = props;

    const getDuracion = () => {
        const inicio = moment(fecha_inicio);
        const fin = moment(fecha_fin);
        const dif = fin - inicio;
        const fecha = moment("00:00", "HH:mm").add(dif, 'ms');
        return `${fecha.format('h')}hr ${fecha.format('mm')}min`;
    }

    return (
        <div className="card-pelicula mb-3">
            <div className="card-pelicula-poster">
                <img style={{width: '100%'}} src={`${TMDB_IMAGENES}${poster}`} />
            </div>
            <div className="card-pelicula-info">
                <span className="titulo blanco">{titulo}</span>
                <div className='pelicula-datos'>
                    <span>{moment(fecha_inicio).format("DD-MM-YYYY")}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                    <span>{getDuracion()}</span>
                </div>
                <div className='pelicula-datos'>
                    <span>{sala}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                    <span>
                        <RenderCurrency value={precio} className="text-small" />
                    </span>
                </div>
            </div>
            <div className='flex-1 mb-3'>
                <Link className="btn btn-small btn-danger" to={`/funcion/${id}`}>Detalle</Link>
            </div>

        </div>
    )
}

export default CardFuncion;
