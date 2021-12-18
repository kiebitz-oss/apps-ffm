import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { MediatorApiProvider } from './MediatorApiContext';
import { ProviderRow } from './ProviderRow';

export default {
    component: ProviderRow,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ProviderRow provider={providers[0]} />
    </MediatorApiProvider>
);
