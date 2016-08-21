import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import configureStore from './store';
import {App} from './app';

import 'sanitize.css/sanitize.css';
import './assets/styles/styles.css';

// Create redux store
const initialState = {};
const store = configureStore(initialState);

const render = ((rootElement) => {

    return (appRoot) => {
        ReactDOM.render(appRoot, rootElement);
    };

})(document.querySelector('main'));

if (__DEV__ && module.hot) {
    const AppContainer = require('react-hot-loader').AppContainer;

    render(
        <AppContainer>
            <App store={store} history={browserHistory}/>
        </AppContainer>
    );

    module.hot.accept('./app', () => {
        render(
            <AppContainer>
                <App store={store} history={browserHistory}/>
            </AppContainer>
        );
    });
}
else {
    render(
        <App store={store} history={browserHistory}/>
    );
}
