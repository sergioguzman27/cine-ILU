import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_IMAGENES } from '../../utils/constants';
import { RenderCurrency } from '../../components/Fields/ReadFields';
import { ClockCircleFilled, CalendarFilled, WalletFilled, CustomerServiceFilled } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from 'moment';
import './styles.scss';

const contentStyle = {
    height: '160px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#FFF',
};

class DetalleFuncion extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getFuncion(id);
    }

    getDuracion = (fecha_inicio, fecha_fin) => {
        const inicio = moment(fecha_inicio);
        const fin = moment(fecha_fin);
        const dif = fin - inicio;
        const fecha = moment("00:00", "HH:mm").add(dif, 'ms');
        return `${fecha.format('h')}hr ${fecha.format('mm')}min`;
    }

    render() {
        const { item, videos, imagenes } = this.props;
        return (
            <div className="w-100">
                {(item && item.id) && (
                    <Fragment>
                        <div
                            style={{ backgroundImage: `url('${TMDB_IMAGENES}${item.pelicula.backdrop_path}')` }}
                            className="portada"
                        >
                            <div className="">
                                {/* <h5 className="uppercase danger">Ahora online</h5> */}
                                <h1 className="uppercase blanco px-5">{item.pelicula.title}</h1>
                                <Link className="btn btn-primary mt-4 ml-5" to={`/funciones`}>Comprar tickets</Link>
                            </div>
                        </div>
                        <div className="funcion-contenido">
                            <div className="d-flex flex-column flex-md-row flex-1 px-3 px-md-5">
                                <div className="d-flex justify-content-center flex-column flex-2">
                                    <span className="text-small">
                                        <ClockCircleFilled className="mr-3" />
                                        {this.getDuracion(item.fecha_hora_inicio, item.fecha_hora_fin)}
                                    </span>
                                    <span className="text-small mt-1">
                                        <CalendarFilled className="mr-3" />
                                        {moment(item.fecha_hora_inicio).format("DD-MM-YYYY")}
                                    </span>
                                    <span className="text-small mt-1">
                                        <CustomerServiceFilled className="mr-3" />
                                        {item.sala.nombre}
                                    </span>
                                    <span className="text-small mt-1">
                                        <WalletFilled className="mr-3" />
                                        <RenderCurrency value={item.precio} className="text-small" />
                                    </span>
                                </div>
                                <div className="flex-3 align-items-center mt-3 mt-md-0">
                                    <p className="blanco">{item.pelicula.overview}</p>
                                </div>
                            </div>

                            <div className="d-flex flex-row flex-1 px-3 px-md-5 mt-5">
                                <h4 className="bold primary">Videos y trailers</h4>
                            </div>
                            <div className="d-flex flex-row flex-1 px-3 px-md-5 mt-5">
                                <div className="d-flex justify-content-center row m-0 p-0">
                                    {videos.map((_item, index) => (
                                        <div key={index} className='col-12 col-md-2 col-lg-4'>
                                            <iframe
                                                width="100%"
                                                // height="600"
                                                src={`https://www.youtube.com/embed/${_item.key}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className="d-flex flex-row flex-1 px-3 px-md-5 mt-5">
                                <h4 className="bold primary">Galeria</h4>
                            </div>
                            <div className="d-flex flex-row flex-1 px-3 px-md-5 mt-5">
                                <Carousel className="w-100 carousel-responsive" autoPlay={true} infiniteLoop interval={10000}>
                                    {imagenes.map((_item, index) => (
                                        <div key={index}>
                                            <img  className="w-100"  src={`${TMDB_IMAGENES}${_item.file_path}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default DetalleFuncion;