import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from './common/UserApiContext';
import { FinderPage } from './finder/index';

export default {
    component: FinderPage,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderPage />
    </UserApiProvider>
);
