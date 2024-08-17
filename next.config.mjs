import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io'
      }
    ]
  },
  webpack: (config) => {
    // Disable canvas module to avoid conflicts or warnings
    config.resolve.alias.canvas = false;

    return config;
  }
};

export default nextConfig;
