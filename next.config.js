/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData:
      "@import 'public/styles/colors.scss'; @import 'public/styles/mixin.scss';",
  },
};

module.exports = {
  ...nextConfig,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://13.125.242.16/api/:path*`,
      },
    ];
  },
};
