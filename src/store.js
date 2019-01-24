import {createStore, combineReducers} from 'redux';
import {wordsExplorerReducer} from './reducers';
import {reducer as formReducer} from 'redux-form'

export default createStore(
    combineReducers({
        wordsExplorerReducer,
        form: formReducer
    })
);