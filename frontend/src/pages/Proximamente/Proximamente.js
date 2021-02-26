import React, { Component, Fragment } from 'react';
import coverImg from '../../assets/static/proximamente.jpg';
import CardProx from '../../components/Cards/CardProx';
import { Modal } from 'react-responsive-modal';
import { api } from '../../utils/api';
import './styles.scss';

class Proximamente extends Component {

    state = {
        modal: false,
        videoKey: null
    }

    componentDidMount() {
        this.props.getProximamente();
    }

    openVideo = (id) => {
        api.get('peliculas/trailers', { id }).then(response => {
            if (response.results && response.results.length) {
                const videoKey = response.results[0].key
                this.setState({modal: true, videoKey})
            } else {
                this.setState({modal: true, videoKey: null})
            }
        }).catch(() => {
            this.setState({modal: true, videoKey: null})
        })
    }

    renderModal = () => (
        <Modal
            showCloseIcon={false}
            closeOnOverlayClick={true}
            closeOnEsc={true}
            open={this.state.modal}
            onClose={() => this.setState({modal: false, videoKey: null})}
            center
        >
            <div className='d-flex justify-content-center align-items-center'>
                {(this.state.videoKey) ? (
                    <iframe
                        width="800"
                        height="600"
                        src={`https://www.youtube.com/embed/${this.state.videoKey}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <h5>{'No es posible reproducir el video ahorita :('}</h5>
                ) }
            </div>
        </Modal>
    )

    render() {
        const { proximamente } = this.props;
        return (
            <div className="w-100">
                {this.renderModal()}
                <div
                    style={{backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.5) 0%,#000000 100%), url(${coverImg})`}}
                    className="portada-proximamente"
                >
                    <div className="">
                        <h5 className="uppercase blanco">Proximamente</h5>
                        <h1 className="uppercase blanco">¡Proximamente podrás disfrutar <br/> de más peliculas!</h1>
                    </div>
                </div>
                <div className="proximamente">
                    <div className="row p-0 m-0">
                        {proximamente.map((item, index) => (
                            <div key={index} className="col-12 mb-5">
                                <CardProx
                                    id={item.id}
                                    titulo={item.title}
                                    poster={item.poster_path}
                                    descripcion={item.overview}
                                    fecha={item.release_date}
                                    openVideo={this.openVideo}
                                />
                            </div>
                        ))}  
                    </div>
                </div>
            </div>
        );
    }
}

export default Proximamente;