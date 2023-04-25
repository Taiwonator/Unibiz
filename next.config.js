/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
  images: {
    domains: [
      'via.placeholder.com',
      'logo.clearbit.com',
      'lh3.googleusercontent.com',
      'source.unsplash.com',
      's3unibiz.s3.eu-west-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
