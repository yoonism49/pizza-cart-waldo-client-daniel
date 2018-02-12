import { combineReducers } from 'redux';
import pizza from './pizzaReducer';

const rootReducer = combineReducers({
    pizza
});

export default rootReducer;