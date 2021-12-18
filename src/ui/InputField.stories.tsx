import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { InputField } from './InputField';

export default {
    component: InputField,
    args: {
        name: 'input-field',
    },
} as ComponentMeta<typeof InputField>;

export const Default: ComponentStory<typeof InputField> = (args) => (
    <InputField {...args} />
);

export const Label = Default;
Label.args = {
    label: 'Label',
};

export const Description = Default;
Description.args = {
    description: 'Description',
};
