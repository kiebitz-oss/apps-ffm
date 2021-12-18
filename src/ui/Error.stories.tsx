import { Meta } from '@storybook/react';
import React from 'react';
import { Error, ErrorProps } from './Error';

export default {
    component: Error,
} as Meta<ErrorProps>;

export const Default = () => <Error>Errormessage</Error>;
