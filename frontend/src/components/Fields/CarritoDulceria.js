import React from 'react';
import { Field } from 'redux-form';
import { NumberField } from '../Fields/Inputs';
import { RenderCurrency } from './ReadFields';
import Swal from 'sweetalert2';

const CarritoDulceria = ({fields, dulceria, eliminarCarrito}) => {
    
    const eliminar = (index) => {
        Swal.fire({
            title: 'Confirmación',
            text: '¿Desea eliminar ese item de su carrito?',
            type: 'warning',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, eliminar!',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value)
                eliminarCarrito(index);
        });

    }

    return (
        <div className="d-flex justify-content-center row p-0 m-0 w-100">
            {fields.map((item, index) => (
                <div key={index} className="card-dulceria col-md-4 col-6">
                    <button
                        type="button"
                        onClick={() => eliminar(index)}
                        style={{ position: "absolute", top: 0, right: 0 }} className="btn-clear"
                    >
                        <i className="fas fa-trash blanco" />
                    </button>
                    <h4 className="blanco">{dulceria[index].nombre}</h4>
                    <div className="d-flex w-100">
                        <div className="d-flex flex-column align-items-center justify-content-center flex-2">
                            <img style={{ width: '80%' }} src={dulceria[index].imagen} />
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center flex-3">
                            <div className="d-flex flex-1 w-100 my-4">
                                <span className='flex-1 bold blanco'>Precio:</span>
                                <span className="flex-1 alter1">
                                    <RenderCurrency value={dulceria[index].precio} className="span alter1" />
                                </span>
                            </div>
                            <div className="d-flex flex-1 w-100 my-4">
                                <span className='flex-1 bold blanco'>Cantidad:</span>
                                <div className="flex-1">
                                    <Field
                                        name={`${item}.cantidad`}
                                        component={NumberField}
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-1 w-100 my-4">
                                <span className='flex-1 bold blanco'>Total:</span>
                                <span className="flex-1 alter1">
                                    <RenderCurrency value={dulceria[index].precio * dulceria[index].cantidad} className="span alter1" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CarritoDulceria;