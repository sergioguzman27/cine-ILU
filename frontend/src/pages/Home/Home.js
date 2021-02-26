import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/static/background.jpg';
import CardPelicula from '../../components/Cards'
import './home.scss';

class Home extends Component {

    componentDidMount() {
        this.props.getEstrenos();
    }

    render() {
        const { estrenos } = this.props;
        return (
            <div className="w-100">
                <div
                    style={{backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.5) 0%,#000000 100%), url(${background})`}}
                    className="portada"
                >
                    <div className="">
                        <h5 className="uppercase danger">Ahora online</h5>
                        <h1 className="uppercase blanco">¡Disfruta de las mejores peliculas!</h1>
                        <Link className="btn btn-primary mt-4" to={`/funciones`}>Ver funciones</Link>
                    </div>
                </div>
                <div className="estrenos">
                    <span className="bold alter1 ml-5">ESTRENOS</span>
                    <h4 className="bold blanco mb-4 ml-5">PELICULAS DE ESTRENO</h4>
                    <div className="row p-0 m-0">
                        {estrenos.map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-12">
                                <CardPelicula
                                    titulo={item.title}
                                    poster={item.poster_path}
                                    descripcion={item.overview}
                                    fecha={item.release_date}
                                />
                            </div>
                        ))}  
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;