import React, { useState } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { NumberField } from '../../components/Fields/Inputs';
import { RenderCurrency } from '../../components/Fields/ReadFields';

const validate = values => {
    const errors = {}
    if (!values.cantidad) {
        errors.email = 'Campo requerido'
    }
    return errors
}

const ModalCarrito = (props) => {
    const { modal, item, cerrarModal, agregarCarrito } = props;

    return (
        <Modal
            showCloseIcon={true}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            open={modal}
            onClose={cerrarModal}
            center
        >
            <div className='d-flex flex-column justify-content-center align-items-center p-5'>
                {item && (
                    <div className="d-flex flex-column flex-md-row flex-1 w-100">
                        <div className="d-flex align-items-center justify-content-center flex-2">
                            <img style={{ width: '80%' }} src={item.imagen} />
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center flex-3">
                            <h5 className="">{item.nombre}</h5>
                            <div className="d-flex flex-1 w-100 my-1">
                                <span className='flex-1 bold'>Precio:</span>
                                <span className="flex-1 alter1">
                                    <RenderCurrency value={item.precio} className="span bold" />
                                </span>
                            </div>
                            <div className="d-flex flex-1 w-100 my-1">
                                <span className='flex-1 bold'>Cantidad:</span>
                                <div className="flex-1">
                                    <Field
                                        name="cantidad"
                                        component={NumberField}
                                        feedBack
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-1 w-100 my-1">
                                <span className='flex-1 bold'>Subtotal:</span>
                                <span className="flex-1 primary">
                                    <RenderCurrency value={item.precio * (props.cantidad ? props.cantidad : 0)} className="span primary bold" />
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="btn-box-left flex-column flex-md-row mt-5 px-4">
                    <button onClick={cerrarModal} className="flex-1 btn btn-secondary mr-md-5" type="button">Cancelar</button>
                    <button onClick={() => agregarCarrito(props.cantidad)} className="flex-1 btn btn-primary mt-3 mt-md-0" type="button">Añadir</button>
                </div>
            </div>
        </Modal>
    )
}

const selector = formValueSelector('ComidaForm');
const mstp = state => {
    const cantidad = selector(state, 'cantidad');

    return {
        cantidad,
    }
};

export default reduxForm({
    form: 'ComidaForm',
    validate: validate,
})(connect(mstp, null)(ModalCarrito));