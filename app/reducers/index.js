import { combineReducers } from 'redux';
import homeReducers from './homeReducer.js';

export default combineReducers({
  home: homeReducers
});
