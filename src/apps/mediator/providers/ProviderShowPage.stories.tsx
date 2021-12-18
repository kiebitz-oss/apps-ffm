import { Meta } from '@storybook/react';
import React from 'react';
import { MediatorApiProvider } from '../common/MediatorApiContext';
import { ProviderShowPage } from './show';

export default {
    component: ProviderShowPage,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ProviderShowPage />
    </MediatorApiProvider>
);
