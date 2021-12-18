import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { MediatorApiProvider } from '../common/MediatorApiContext';
import { ReconfirmProvidersModal } from './ReconfirmProvidersModal';

export default {
    component: ReconfirmProvidersModal,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ReconfirmProvidersModal providers={providers} />
    </MediatorApiProvider>
);
