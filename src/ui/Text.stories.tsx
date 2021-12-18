import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Text } from './Text';

export default {
    component: Text,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof Text>;

export const Default: ComponentStory<typeof Text> = (args) => (
    <Text {...args} />
);
