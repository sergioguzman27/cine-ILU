import React, { Component, Fragment } from 'react';
import CardFuncion from '../../components/Cards/CardFuncion';
import { Pagination } from 'antd';
import { FiltroFecha, FiltroPrecio } from '../../components/Fields/Filtros';
import LoadMask from '../../components/LoadMask';
import coverImg from '../../assets/static/funciones.jpg';
import './styles.scss';

class Funciones extends Component {


    componentDidMount() {
        this.props.getFunciones();
    }

    render() {
        const { loader, funciones, page, getFunciones, precio_min, precio_max } = this.props;
        return (
            <div className="w-100">
                <LoadMask loading={loader}>
                    <div
                        style={{backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.1) 0%,#000000 100%), url(${coverImg})`}}
                        className="portada-funciones"
                    >
                        <div className="">
                            <h5 className="uppercase danger">FUNCIONES</h5>
                            <h1 className="uppercase blanco">¡Nuestra CARTELERA!</h1>
                        </div>
                    </div>
                    <div className="estrenos">
                        <div className="filtros">
                            <div className="flex-2 mr-md-3">
                                <FiltroFecha fecha={this.props.fecha} onChange={this.props.changeFecha}/>
                            </div>
                            <div className="flex-3 ml-md-3 mb-5 mb-md-0">
                                <FiltroPrecio
                                    afterChange={()=> getFunciones(1)}
                                    rango={[precio_min, precio_max]}
                                    onChange={this.props.changeRango}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="estrenos">
                        <div className="d-flex justify-content-center row p-0 m-0">
                            {funciones.results.map((item, index) => (
                                <div key={item.id} className="col-lg-3 col-md-6 col-12">
                                    <CardFuncion
                                        id={item.id}
                                        titulo={item.pelicula.title}
                                        poster={item.pelicula.poster_path}
                                        fecha_inicio={item.fecha_hora_inicio}
                                        fecha_fin={item.fecha_hora_fin}
                                        sala={item.sala.nombre}
                                        precio={item.precio}
                                    />
                                </div>
                            ))}  
                        </div>
                    </div>
                    <div className="d-flex flex-1 justify-content-center align-items-center my-5 mx-lg-5">
                        <Pagination
                            size="default"
                            current={page}
                            total={funciones.count}
                            onChange={getFunciones}
                        />
                    </div>
                </LoadMask>
            </div>
        );
    }
}

export default Funciones;