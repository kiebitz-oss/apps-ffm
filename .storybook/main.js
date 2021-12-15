/** @type {import('@storybook/react/types').StorybookConfig} */
module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        '@storybook/addon-a11y',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    reactOptions: {
        fastRefresh: true,
        // kills react 18
        strictMode: false,
    },
    features: {
        /**
         * @see https://storybook.js.org/blog/component-story-format-3-0/
         */
        postcss: false,
        // previewCsfV3: true,
        // babelModeV7: true,
        // buildStoriesJson: true,
        // modernInlineRender: true,
        // see https://github.com/storybookjs/storybook/issues/16084
        // breaks a11y
        // storyStoreV7: true,
    },
};
