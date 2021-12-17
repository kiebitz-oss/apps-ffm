module '@carbon/icons-react';

declare module '*.svg' {
    const url: string;

    export default url;
}
