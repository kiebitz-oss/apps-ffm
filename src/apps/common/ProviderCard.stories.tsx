import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { ProviderCard } from './ProviderCard';

export default {
    component: ProviderCard,
} as Meta;

export const Default = () => <ProviderCard provider={providers[0]} />;
