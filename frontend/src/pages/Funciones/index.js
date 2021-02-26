import { connect } from 'react-redux';
import { actions } from '../../redux/reducers/peliculas';
import Funciones from './Funciones';

const ms2p = (state) => {
    return {
        ...state.peliculas,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Funciones);
