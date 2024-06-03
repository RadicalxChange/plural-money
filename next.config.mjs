import nextMdx from '@next/mdx'

const withMdx = nextMdx()

/** @type {import('next').NextConfig} */
const nextConfig = withMdx({
reactStrictMode: true,
pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ["web-worker"]
  }
});

export default nextConfig;
