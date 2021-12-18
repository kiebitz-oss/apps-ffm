import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from '../common/UserApiContext';
import { FinderStateProvider } from './FinderStateProvider';
import { SuccessStep } from './SuccessStep';

export default {
    component: SuccessStep,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderStateProvider>
            <SuccessStep />
        </FinderStateProvider>
    </UserApiProvider>
);
