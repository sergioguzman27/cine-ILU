import React, { Component, Fragment } from 'react';
import { TMDB_IMAGENES } from '../../utils/constants';
import coverImg from '../../assets/static/tickets.jpg';
import CompraForm from './CompraForm';
import Swal from 'sweetalert2';
import './styles.scss';

class CompraTickets extends Component {


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getFuncion(id, true);
    }

    onSubmit = (values) => {
        const data = {...values};
        const { butacas } = this.props;
        let seleccionados = 0;
        butacas.forEach(item => {
            item.forEach(_item => {
                if (_item.selected)
                    seleccionados += 1
            })
        });
        if (seleccionados < data.cantidad) {
            Swal.fire(
                'Error!',
                'Debes seleccionar todos tus asientos',
                'error'
            )
        } else {
            Swal.fire(
                'Excelente!',
                'Has realizado tu compra! Disfruta tu función',
                'success'
            )
        }
    }

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