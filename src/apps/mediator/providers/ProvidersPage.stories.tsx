import { Meta } from '@storybook/react';
import React from 'react';
import { ProvidersPage } from '.';
import { MediatorApiProvider } from '../common/MediatorApiContext';

export default {
    component: ProvidersPage,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ProvidersPage />
    </MediatorApiProvider>
);
