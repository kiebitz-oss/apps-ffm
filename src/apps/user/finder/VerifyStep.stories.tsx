import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from '../common/UserApiContext';
import { FinderStateProvider } from './FinderStateProvider';
import { VerifyStep } from './VerifyStep';

export default {
    component: VerifyStep,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderStateProvider>
            <VerifyStep />
        </FinderStateProvider>
    </UserApiProvider>
);
