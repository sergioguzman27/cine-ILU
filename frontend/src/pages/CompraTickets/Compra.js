import React, { Component, Fragment } from 'react';
import { TMDB_IMAGENES } from '../../utils/constants';
import coverImg from '../../assets/static/tickets.jpg';
import CompraForm from './CompraForm';
import { Modal } from 'react-responsive-modal';
import Swal from 'sweetalert2';
import './styles.scss';

class CompraTickets extends Component {

    state = {
        modal: false,
        response: null
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getFuncion(id, true);
        this.props.getComida();
    }

    openModal = (response) => {
        console.log("abrir modal")
        this.setState = ({ modal: true, response })
    }

    closeModal = () => {
        this.setState = ({ modal: false });
        this.props.history.push('/funciones');
    }

    onSubmit = (values) => {
        const data = { ...values };
        const boletos = [];
        const { butacas } = this.props;
        let seleccionados = 0;
        butacas.forEach(item => {
            item.forEach(_item => {
                if (_item.selected) {
                    boletos.push({ butaca: _item.id });
                    seleccionados += 1;
                }
            })
        });
        if (seleccionados < data.cantidad) {
            Swal.fire(
                'Error!',
                'Debes seleccionar todos tus asientos',
                'error'
            )
        } else {
            data.funcion = this.props.match.params.id;
            data.boletos = boletos;
            if (data.dulceria)
                data.dulceria = data.dulceria.map(item => ({ comida: item.id, cantidad: item.cantidad }))
            this.props.comprarBoletos(data, this.closeModal);
        }
    }

    renderModal = () => (
        <Modal
            showCloseIcon={true}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            open={this.state.modal}
            onClose={this.closeModal}
            center
        >
            <div className='d-flex flex-column justify-content-center align-items-center p-5'>
                <i style={{ fontSize: '7rem' }} className="fas fa-check-circle alter1" />
                <h5 className="mt-3">Compra realizada con exito</h5>
                <span className="mt-3">Si no ves la descarga de tus boletos, da click en el botón de descargar. Luego ya puedes cerrar la modal</span>
                <div className="btn-box-left flex-column flex-md-row mt-5 px-4">
                    <button onClick={this.closeModal} className="flex-1 btn btn-secondary mr-md-5" type="button">Cerrar</button>
                    <button onClick={this.closeModal} className="flex-1 btn btn-primary mt-3 mt-md-0" type="button">Descargar</button>
                    {/* <div className="d-none d-md-flex flex-4"></div> */}
                </div>
            </div>
        </Modal>
    )

    render() {
        const { item } = this.props;
        return (
            <div className="w-100">
                <div
                    style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.3) 0%,#000000 100%), url(${coverImg})` }}
                    className="portada-compra"
                >
                    <div className="">
                        <h5 className="uppercase danger">Sigue los pasos y</h5>
                        <h1 className="uppercase blanco">Reserva tus asientos</h1>
                    </div>
                </div>
                {(item && item.id) && (
                    <CompraForm {...this.props} onSubmit={this.onSubmit} />
                )}
            </div>
        );
    }
}

export default CompraTickets;