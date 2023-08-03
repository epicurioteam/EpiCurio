// Connect React application to index.html file

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
 
import reducers from './reducers'; // import root reducers

import App from './App';
// Bringing in the GoogleOAuthProvider from the package

// import NOICE background with svg.com
import './index.css';

// create global store variable that contains all application states 
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root')
);