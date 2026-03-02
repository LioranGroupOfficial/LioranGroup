import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.lioran.group',
          },
        ],
        destination: 'https://lioran.group/:path*',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
