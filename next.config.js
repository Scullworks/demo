/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPWA({
    reactStrictMode: true
});

module.exports = nextConfig;
