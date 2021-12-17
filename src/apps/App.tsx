// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import '@fontsource/ibm-plex-sans/latin.css';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages as deMessages } from 'locales/de/messages';
import { messages as enMessages } from 'locales/en/messages';
import { de, en } from 'make-plural/plurals';
import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import './app.css';

const MediatorApp = React.lazy(
    () => import(/* webpackChunkName: "mediator-app" */ './mediator/App')
);
const ProviderApp = React.lazy(
    () => import(/* webpackChunkName: "provider-app" */ './provider/App')
);
const UserApp = React.lazy(
    () => import(/* webpackChunkName: "user-app" */ './user/App')
);

i18n.loadLocaleData({
    de: { plurals: de },
    en: { plurals: en },
});

i18n.load({
    de: deMessages,
    en: enMessages,
});

i18n.activate('de');

export default function App() {
    return (
        <I18nProvider i18n={i18n}>
            <Router>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Routes>
                        <Route path="/mediator/*" element={<MediatorApp />} />
                        <Route path="/provider/*" element={<ProviderApp />} />
                        <Route path="/user/*" element={<UserApp />} />
                        <Route path="*" element={<Navigate to="/user" />} />
                    </Routes>
                </Suspense>
            </Router>
        </I18nProvider>
    );
}
