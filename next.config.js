/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
      {
        source: '/signout',
        destination: '/api/auth/signout',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/api/auth/signin',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: { domains: ['via.placeholder.com', 'logo.clearbit.com'] },
};

module.exports = nextConfig;
