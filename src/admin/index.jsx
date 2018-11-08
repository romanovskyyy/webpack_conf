import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './pages';
window.$ = window.jQuery = require('jquery');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/admin" component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
