const nextConfig = {
  exportTrailingSlash: true,
  swcMinify: true,
};

module.exports = {
  images: {
    unoptimized: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/policy": { page: "/post", query: { title: "/policy" } },
      "/dashBoard": { page: "/post", query: { title: "/dashBoard" } },
      "/register": { page: "/post", query: { title: "/register" } },
      "/profile": { page: "/post", query: { title: "/profile" } },
    };
  },
};

