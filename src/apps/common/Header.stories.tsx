import { Meta } from '@storybook/react';
import React from 'react';
import { Nav } from '../user/common/Nav';
import { Header, HeaderProps } from './Header';

export default {
    component: Header,
    argTypes: { onMobileNavClick: { action: 'onMobileNavClick clicked' } },
} as Meta<HeaderProps>;

export const Default = () => <Header nav={Nav} />;
