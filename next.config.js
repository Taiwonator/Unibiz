/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // const signinSources = ['/signin', '/auth/signin'];
    // return [
    //   {
    //     source: '/signup',
    //     destination: '/auth/signup',
    //     permanent: true,
    //   },
    //   ...signinSources.map((s) => ({
    //     source: s,
    //     destination: '/api/auth/signin',
    //     permanent: true,
    //   })),
    // ];
    return [];
  },
  reactStrictMode: true,
  images: { domains: ['via.placeholder.com', 'logo.clearbit.com'] },
};

module.exports = nextConfig;
