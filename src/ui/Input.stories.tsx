import { Meta } from '@storybook/react';
import React from 'react';
import { Input, InputProps } from './Input';

export default {
    component: Input,
} as Meta<InputProps>;

export const Default = () => <Input />;
