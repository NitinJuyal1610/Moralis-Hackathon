/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless'
}

module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

