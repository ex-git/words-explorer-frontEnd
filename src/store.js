import {createStore} from 'redux';
import {wordsExplorerReducer} from './reducers';
export default createStore(wordsExplorerReducer);