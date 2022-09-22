const nextConfig = {
  exportTrailingSlash: true,
  swcMinify: true,
};

module.exports = {
  images: {
    unoptimized: true,
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/Policy": { page: "/Policy" },
      "/Profile": { page: "/Profile" },
      "/Dashboard": { page: "/Dashboard" },
      "/Login": { page: "/Login" },
      "/Register": { page: "/Register" },
    };
  },
};
