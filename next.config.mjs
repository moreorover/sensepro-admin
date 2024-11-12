/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  // serverComponentsExternalPackages: ["@node-rs/argon2"],
  // },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
