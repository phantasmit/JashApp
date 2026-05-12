import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootSaga } from '../sagas';
import index from './index';
//import sagaMiddleware from './middleware';
//import createSagaMiddleware from 'redux-saga';
//import createSagaMiddleware from 'redux-saga/dist/redux-saga';
//import createSagaMiddleware from 'redux-saga';



const persistConfirg = {
    timeout: 0,
    key: 'root',
    storage: AsyncStorage,
    whiteList: [],
    blacklist: []
}

//Persisting reducers
const persistReducers = persistReducer(persistConfirg, index);
const createSagaMiddleware = require('redux-saga').default;
//Configure store 
const sagaMiddleware = createSagaMiddleware();
let store = configureStore({
    reducer: persistReducers,
    middleware: () => [sagaMiddleware,createLogger()]
});
//persist store 
let persistor = persistStore(store);


//Redux sage to start
sagaMiddleware.run(rootSaga);
//

export { store, persistor };