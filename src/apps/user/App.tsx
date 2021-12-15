// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Layout } from 'apps/common/Layout';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Nav } from './common/Nav';
import { UserApiProvider } from './common/UserApiContext';
import { FaqPage } from './FaqPage';
import FinderPage from './finder';
import { ImprintPage } from './ImprintPage';
import { PrivacyPage } from './privacy';
import { StatusPage } from './StatusPage';
import './user.css';
import WelcomePage from './WelcomePage';

export default function UserApp() {
    return (
        <UserApiProvider>
            <Layout nav={Nav}>
                <Routes>
                    <Route path="/finder">
                        <Route path=":step" element={<FinderPage />} />
                        <Route index element={<FinderPage />} />
                    </Route>
                    <Route path="/status" element={<StatusPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/imprint" element={<ImprintPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route index element={<WelcomePage />} />
                </Routes>
            </Layout>
        </UserApiProvider>
    );
}
