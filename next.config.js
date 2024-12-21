/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['api.nucleoid.xyz'],
  },
  async redirects() {
    return [
      {
        source: '/wrapped',
        destination: '/wrapped/2024',
        permanent: false,
      },
    ];
  },
}
