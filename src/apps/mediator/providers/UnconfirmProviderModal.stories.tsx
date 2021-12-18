import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { MediatorApiProvider } from '../common/MediatorApiContext';
import { UnconfirmProviderModal } from './UnconfirmProviderModal';

export default {
    component: UnconfirmProviderModal,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <UnconfirmProviderModal provider={providers[0]} />
    </MediatorApiProvider>
);
