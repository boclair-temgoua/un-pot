/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  transpilePackages: [
    'antd',
    'rc-util',
    'rc-tree',
    'rc-table',
    'rc-picker',
    'rc-tooltip',
    '@ant-design',
    'rc-pagination',
    'rc-notification',
  ],
  images: {
    domains: ['localhost', 'api.unopot.com'],
  },
};

export default nextConfig;
