import { Meta } from '@storybook/react';
import React from 'react';
import { Tag, TagProps } from './Tag';

export default {
    component: Tag,
} as Meta<TagProps>;

export const Default = () => <Tag>Tag</Tag>;
export const Success = () => <Tag variant="success">Tag</Tag>;
export const Warning = () => <Tag variant="warning">Tag</Tag>;
export const Error = () => <Tag variant="error">Tag</Tag>;
