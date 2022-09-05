const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: '@mdx-js/react',
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
        dirs: ['pages', 'sections', 'lib', 'components'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.ya?ml$/,
            use: 'yaml-loader',
        });
        return config;
    },
});

module.exports = nextConfig;
