
import { connect } from 'react-redux';
import { actions } from '../../redux/reducers/peliculas';
import Home from './Home';

const ms2p = (state) => {
    return {
        ...state.peliculas,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Home);
