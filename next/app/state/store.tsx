"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';

const rootReducer = combineReducers({
    department:reducer,
})

const store = configureStore({
    reducer:rootReducer,
})
export default store;