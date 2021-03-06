import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import React, { Component } from 'react';
import Form from './Form';
import { api } from '../../utils/api';

class Eliminar extends Component {


    onSubmit = (data) => {
        const { funcion, fila } = data;
        api.put(`funciones/${funcion}/eliminar_fila`, { fila }).then(response => {

        }).catch(() => {

        })
    }

    render() {
    
        return (
            <div>
                <Form  onSubmit={this.onSubmit} />
            </div>
        )
    }


}

export default Eliminar;
