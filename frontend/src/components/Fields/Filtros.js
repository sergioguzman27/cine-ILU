import React from 'react';
import { DatePicker, Slider } from 'antd';
import moment from 'moment';

export const FiltroFecha = (props) => {
    const { fecha, onChange } = props;

    return (
        <div className="d-flex flex-column w-100">
            <label className="blanco">Filtrar por fecha</label>
            <DatePicker
                value={fecha ? moment(fecha) : null}
                onChange={onChange}
                format="DD-MM-YYYY"
                size="large"
                allowClear
                placeholder="Filtrar por fecha"
            />
        </div>
    )
}


export const FiltroPrecio = (props) => {
    const { rango, onChange, afterChange } = props;

    return (
        <div className="d-flex flex-column w-100">
            <label className="blanco">Filtrar por rango de precios</label>
            <Slider
                range
                defaultValue={[0, 100]}
                max={200}
                value={rango}
                tooltipVisible
                onChange={onChange}
                onAfterChange={afterChange}
                tooltipPlacement="bottom"
            />
        </div>
    )
}
