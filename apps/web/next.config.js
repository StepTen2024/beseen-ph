/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@beseen/ui", "@beseen/database"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};
module.exports = nextConfig;
