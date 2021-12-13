import React from 'react';

export interface Theme {
    title: string;
    supportEmail: string;
    logo: string;
    logoAlt: string;
    footer: React.ReactNode;
    primaryColor: string;
    secondaryColor: string;
}
