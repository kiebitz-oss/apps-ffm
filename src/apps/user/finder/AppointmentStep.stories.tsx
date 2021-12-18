import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from '../common/UserApiContext';
import { AppointmentStep } from './AppointmentStep';
import { FinderStateProvider } from './FinderStateProvider';

export default {
    component: AppointmentStep,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderStateProvider>
            <AppointmentStep />
        </FinderStateProvider>
    </UserApiProvider>
);
