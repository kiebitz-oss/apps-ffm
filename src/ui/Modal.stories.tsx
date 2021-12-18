import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Modal } from './Modal';

export default {
    component: Modal,
    args: {
        children: 'Modal content',
    },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
    <Modal {...args} />
);
