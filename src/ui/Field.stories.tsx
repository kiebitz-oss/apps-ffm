import { Meta } from '@storybook/react';
import React from 'react';
import { Field, FieldProps } from './Field';

export default {
    component: Field,
} as Meta<FieldProps>;

export const Default = () => <Field name="field">Fieldcontent</Field>;
