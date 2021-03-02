import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { actions } from '../../redux/reducers/peliculas';
import CompraTickets from './Compra';

const ms2p = (state) => {
    return {
        ...state.peliculas,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(withRouter(CompraTickets));
