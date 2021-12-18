import { Meta } from '@storybook/react';
import React from 'react';
import { Text, TextProps } from './Text';

export default {
    component: Text,
} as Meta<TextProps>;

export const Default = () => <Text>Text</Text>;
