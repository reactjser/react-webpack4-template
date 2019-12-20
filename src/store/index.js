import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// mount it on the Store
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ),
);

// then run the saga
sagaMiddleware.run(mySaga);

export default store;
