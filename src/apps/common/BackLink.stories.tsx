import { Meta } from '@storybook/react';
import React from 'react';
import { BackLink } from './BackLink';

export default {
    component: BackLink,
} as Meta;

export const Default = () => <BackLink href="#">Zurück zur Seite</BackLink>;
