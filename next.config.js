/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData:
      "@import 'public/styles/colors.scss'; @import 'public/styles/mixin.scss';",
  },
};

module.exports = nextConfig;
