/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["web-worker"]
  }
};

export default nextConfig;
