import React, { useState } from 'react';
import { DISPONIBLE, NO_DISPONIBLE } from '../../utils/constants';
import butacaLibre from '../../assets/static/butaca-libre.svg';
import butacaOcupado from '../../assets/static/butaca-ocupado.svg';
import butacaSelected from '../../assets/static/butaca-selected.svg';

const LETRAS = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const Sala = (props) => {
    const { butacas, changeButaca } = props;
    const [refresh, setRefresh] = useState(false);

    const getIcono = (item) => {
        if (item.estado == NO_DISPONIBLE)
            return butacaOcupado;
        if (item.selected)
            return butacaSelected
        return butacaLibre
    }


    return (
        <div className="sala-container">
            <div className='sala'>
                
                <div className="guia">
                    <div className="d-flex align-items-center mr-4">
                        <div
                            style={{ backgroundImage: `url(${butacaLibre})` }}
                            className="butaca-guia"
                        />
                        <span className="ml-1">Disponible</span>
                    </div>
                    <div className="d-flex align-items-center mr-4">
                        <div
                            style={{ backgroundImage: `url(${butacaOcupado})` }}
                            className="butaca-guia"
                        />
                        <span className="ml-1">No Disponible</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div
                            style={{ backgroundImage: `url(${butacaSelected})` }}
                            className="butaca-guia"
                        />
                        <span className="ml-1">Seleccionado</span>
                    </div>
                </div>
                {/* Pantalla */}
                <div className="pantalla">
                    Pantalla
                </div>
                {butacas && butacas.map((item, fil) => (
                    <div key={fil} className="fila">
                        <div className="columna">
                            <span>{LETRAS[fil]}</span>
                        </div>
                        {item.map((asiento, col) => (
                            <div
                                key={col}
                                onClick={() => { if (asiento.estado == DISPONIBLE) { changeButaca(fil, col); setRefresh(!refresh)  }}}
                                className={`butaca ${asiento.estado == NO_DISPONIBLE && 'disabled'}`}
                            >
                                <span>{col + 1}</span>
                                <div
                                    style={{ backgroundImage: `url(${getIcono(asiento)})` }}
                                    className="butaca-icono"
                                ></div>
                            </div>
                        ))}
                    </div>
                ))}
                
            </div>

        </div>
    )
}

export default Sala;