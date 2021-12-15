// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

/* eslint-env node */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);

if (['development'].includes(process.env.NODE_ENV)) {
    if (module.hot) {
        module.hot.accept(() => {
            render();
        });
    }
}
