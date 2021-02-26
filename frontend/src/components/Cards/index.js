import React from 'react';
import { TMDB_IMAGENES } from '../../utils/constants';
import moment from 'moment';

const CardPelicula = (props) => {
    const {poster, titulo, descripcion, fecha } = props;

    return (
        <div className="card-pelicula">
            <div className="card-pelicula-poster">
                <img style={{width: '100%'}} src={`${TMDB_IMAGENES}${poster}`} />
            </div>
            <div className="card-pelicula-info">
                <span className="blanco">{titulo}</span>
                <div className='pelicula-datos'>
                    <span>{moment(fecha).format('DD/MM/YYYY')}  |  </span>
                    <span>PG</span>
                </div>
                <p className="blanco parrafo-cortado">{descripcion}</p>
            </div>
        </div>
    )
}

export default CardPelicula;
