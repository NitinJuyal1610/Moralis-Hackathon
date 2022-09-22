const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    unoptimized: true,
  },
  exportPathMap: function () {
    return { "/": { page: "/" } };
  },
};
