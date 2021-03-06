import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { NumberField } from '../../components/Fields/Inputs';

const Form = ({ handleSubmit }) => {

    return (
        <form onSubmit={handleSubmit} >

            <div className="d-flex flex-column flex-1 w-100 mt-2">
                <div className="d-flex flex-row flex-1">
                    <div className="form-group">
                        <label className="blanco" htmlFor="username">Funcion</label>
                        <Field
                            name="funcion"
                            component={NumberField}
                            feedBack
                        />
                    </div>
                    <div className="d-none d-md-flex flex-2"></div>
                </div>
            </div>
            <div className="d-flex flex-column flex-1 w-100 mt-2">
                <div className="d-flex flex-row flex-1">
                    <div className="form-group">
                        <label className="blanco" htmlFor="username">Fila</label>
                        <Field
                            name="fila"
                            component={NumberField}
                            feedBack
                        />
                    </div>
                    <div className="d-none d-md-flex flex-2"></div>
                </div>
            </div>

            <div className="btn-box-left flex-column flex-md-row mt-5 px-4">
                <Link to="/funciones" className="flex-1 btn btn-secondary mr-md-5" type="button">Cancelar</Link>
                <button className="flex-1 btn btn-primary mt-3 mt-md-0" type="submit">Eliminar fila</button>
                <div className="d-none d-md-flex flex-4"></div>
            </div>

        </form>
    )

}



export default reduxForm({
    form: 'EliminarFilaForm',
})(Form);