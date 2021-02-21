import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import example from './reducers/example';

export default combineReducers({
    form: formReducer,
    example,
    routing,
});