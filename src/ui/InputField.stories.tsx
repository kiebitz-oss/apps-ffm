import { Meta } from '@storybook/react';
import React from 'react';
import { InputField, InputFieldProps } from './InputField';

export default {
    component: InputField,
} as Meta<InputFieldProps>;

export const Default = () => <InputField name="input" />;
export const Label = () => <InputField name="input" label="Label" />;
export const Description = () => (
    <InputField name="input" label="Label" description="Description" />
);
export const Required = () => (
    <InputField name="input" label="Label" description="Description" required />
);
