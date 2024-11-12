/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");

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
