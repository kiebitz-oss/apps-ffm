// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Layout } from 'apps/common/Layout';
import { Nav } from 'apps/mediator/common/Nav';
import React from 'react';
import { Route, Routes } from 'react-router';
import { MediatorApiProvider } from './common/MediatorApiContext';
import LogoutPage from './logout';
import { ProvidersPage } from './providers';
import { ProviderShowPage } from './providers/show';
import WelcomePage from './WelcomePage';

export default function MediatorApp() {
    return (
        <MediatorApiProvider>
            <Layout nav={Nav}>
                <Routes>
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/providers">
                        <Route path=":id" element={<ProviderShowPage />} />
                        <Route index element={<ProvidersPage />} />
                    </Route>
                    <Route path="/*" element={<WelcomePage />} />
                </Routes>
            </Layout>
        </MediatorApiProvider>
    );
}
