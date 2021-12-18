import { Meta } from '@storybook/react';
import React from 'react';
import { FaqSection, FaqSectionProps } from './FaqSection';

export default {
    component: FaqSection,
} as Meta<FaqSectionProps>;

export const Default = () => <FaqSection>SectionTitle</FaqSection>;
