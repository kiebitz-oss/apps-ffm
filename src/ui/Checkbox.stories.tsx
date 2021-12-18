import { Meta } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
    component: Checkbox,
    argTypes: { onClick: { action: 'click ' } },
} as Meta<CheckboxProps>;

export const Default = () => <Checkbox />;
export const Label = () => <Checkbox label="label" />;
