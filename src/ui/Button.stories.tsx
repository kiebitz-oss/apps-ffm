import { Meta } from '@storybook/react';
import React from 'react';
import { Button, ButtonProps } from './Button';

export default {
    component: Button,
    argTypes: { onClick: { action: 'click ' } },
} as Meta<ButtonProps>;

export const Default = () => <Button>Click me</Button>;
export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Invalid = () => <Button variant="invalid">Invalid</Button>;
