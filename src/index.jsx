import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';

window.$ = window.jQuery = require('jquery');

if (window.location.pathname === '/page-after-login') {
    window.location.href = sessionStorage.getItem('lastUrl');
} else {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>,
        document.getElementById('app')
    );

    if (module.hot) {
        module.hot.accept(() => {
            ReactDOM.render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Route path="/" component={App} />
                    </BrowserRouter>
                </Provider>,
                document.getElementById('app')
            );
        });
    }
}
