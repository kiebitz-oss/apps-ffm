import { Meta } from '@storybook/react';
import React from 'react';
import { Title, TitleProps } from './Title';

export default {
    component: Title,
} as Meta<TitleProps>;

export const Default = () => <Title>Text</Title>;
export const H1 = () => <Title variant="h1">Text</Title>;
export const H2 = () => <Title variant="h2">Text</Title>;
export const H3 = () => <Title variant="h3">Text</Title>;
export const H4 = () => <Title variant="h4">Text</Title>;
export const H5 = () => <Title variant="h5">Text</Title>;
export const H6 = () => <Title variant="h6">Text</Title>;
export const Book = () => <Title variant="book">Text</Title>;
