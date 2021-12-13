/* eslint-env node */
const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    content: ['./src/**/*.tsx', './src/**/*.jsx'],

    theme: {
        container: {
            center: true,
            padding: false,
        },

        extend: {
            fontFamily: {
                sans: [
                    'IBM Plex Sans',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                title: [
                    'IBM Plex Sans',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                body: [
                    'IBM Plex Sans',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
            },

            colors: {
                primary: colors.blue,
                secondary: colors.indigo,
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
