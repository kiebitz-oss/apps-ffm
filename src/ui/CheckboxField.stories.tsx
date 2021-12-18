import { Meta } from '@storybook/react';
import React from 'react';
import { CheckboxField, CheckboxFieldProps } from './CheckboxField';

export default {
    component: CheckboxField,
} as Meta<CheckboxFieldProps>;

export const Default = () => <CheckboxField name="input" />;
export const Label = () => <CheckboxField name="input" label="Label" />;
export const Description = () => (
    <CheckboxField name="input" label="Label" description="Description" />
);
export const Required = () => (
    <CheckboxField
        name="input"
        label="Label"
        description="Description"
        required
    />
);
