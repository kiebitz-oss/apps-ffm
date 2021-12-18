import { Meta } from '@storybook/react';
import React from 'react';
import { SecretBox, SecretBoxProps } from './SecretBox';

export default {
    component: SecretBox,
} as Meta<SecretBoxProps>;

export const Default = () => <SecretBox secret="0123456789abcdef" />;
