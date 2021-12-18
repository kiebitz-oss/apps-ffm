import { Meta } from '@storybook/react';
import React from 'react';
import { Nav, NavProps } from './Nav';

export default {
    component: Nav,
} as Meta<NavProps>;

export const Default = () => <Nav />;
