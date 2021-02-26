import React from 'react';
import { TMDB_IMAGENES } from '../../utils/constants';
import { PlayCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const CardProximamente = (props) => {
    const {id, poster, titulo, descripcion, openVideo } = props;

    return (
        <div className="card-proximamente">
            <div className="pelicula-poster">
                <img style={{height: '35rem'}} src={`${TMDB_IMAGENES}${poster}`} />
            </div>
            <div className="pelicula-info">
                <span className="bold danger">PROXIMAMENTE</span>
                <h3 className="bold blanco">{titulo}</h3>
                <p className="blanco parrafo-cortado">{descripcion}</p>
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => openVideo(id)}
                        className="d-flex justify-content-center align-items-center btn btn-danger"
                    >
                        <PlayCircleOutlined style={{marginRight: "1rem"}} />
                        Ver trailer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProximamente;
