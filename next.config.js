/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' https://melodiusite.vercel.app https://gharwale.vercel.app;
              script-src 'self' https://melodiusite.vercel.app https://gharwale.vercel.app 'unsafe-inline';
              style-src 'self' 'unsafe-inline' https://melodiusite.vercel.app https://gharwale.vercel.app;
              img-src 'self' data: https://melodiusite.vercel.app https://gharwale.vercel.app;
              frame-ancestors 'self' https://melodiusite.vercel.app;
            `.replace(/\n/g, ' '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
