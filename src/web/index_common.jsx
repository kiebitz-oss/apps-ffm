// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'apps/App';

const appElement = document.getElementById('app');

export const render = () => {
    ReactDOM.render(<App />, appElement);
};
