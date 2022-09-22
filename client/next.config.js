/** @type {import('next').NextConfig} */
const nextConfig = {
  exportTrailingSlash: true,
  swcMinify: true,
}

module.exports = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

