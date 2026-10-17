import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/danuy5rqb/image/upload/**',
        search: '',
      },
      // Avatars for builders who signed up with Google.
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      // Avatars for builders who signed up with GitHub.
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  async redirects() {
    const boundlessAppUrl = (
      process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL || 'https://boundlessfi.xyz'
    ).replace(/\/+$/, '');

    return [
      {
        source: '/projects',
        destination: `${boundlessAppUrl}/projects`,
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: `${boundlessAppUrl}/projects`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
