import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { MediatorApiProvider } from './MediatorApiContext';
import { ProviderList } from './ProvidersList';

export default {
    component: ProviderList,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ProviderList providers={providers} />
    </MediatorApiProvider>
);
