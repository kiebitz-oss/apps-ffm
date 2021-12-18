import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from '../common/UserApiContext';
import { DateStep } from './DateStep';
import { FinderStateProvider } from './FinderStateProvider';

export default {
    component: DateStep,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderStateProvider>
            <DateStep />
        </FinderStateProvider>
    </UserApiProvider>
);
