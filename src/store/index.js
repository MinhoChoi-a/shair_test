import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from "redux-thunk";

import options from './options'
import searchResult from './searchResult'

const appReducer = combineReducers({
    options,
    searchResult    
  });

export default createStore(appReducer, applyMiddleware(thunkMiddleware))