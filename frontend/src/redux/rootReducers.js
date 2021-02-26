import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import peliculas from './reducers/peliculas';

export default combineReducers({
    form: formReducer,
    peliculas,
    routing,
});