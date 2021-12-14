// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Layout } from 'apps/common/Layout';
import { Nav } from 'apps/provider/common/Nav';
import React from 'react';
import { Route, Routes } from 'react-router';
import { ProviderApiProvider } from './common/ProviderApiContext';
import LogOutPage from './logout';
import OnboardingPage from './onboarding';
import './provider.css';
import SchedulePage from './schedule';
import SettingsPage from './settings';
import WelcomePage from './WelcomePage';

const ProviderApp: React.FC = () => {
    return (
        <ProviderApiProvider>
            <Layout nav={Nav}>
                <Routes>
                    <Route path="/logout" element={<LogOutPage />} />

                    <Route path="/onboarding">
                        <Route path=":step" element={<OnboardingPage />} />
                        <Route index element={<OnboardingPage />} />
                    </Route>

                    <Route path="/schedule">
                        <Route path="week">
                            <Route path=":week" element={<SchedulePage />} />
                            <Route index element={<SchedulePage />} />
                        </Route>

                        <Route path="day">
                            <Route path=":day" element={<SchedulePage />} />
                            <Route index element={<SchedulePage />} />
                        </Route>
                        <Route index element={<SchedulePage />} />
                    </Route>

                    <Route path="/settings">
                        <Route index element={<SettingsPage />} />
                    </Route>

                    <Route path="/" element={<WelcomePage />} />
                </Routes>
            </Layout>
        </ProviderApiProvider>
    );
};

export default ProviderApp;
