// next.config.js
const path = require("path");

module.exports = {
  webpack: (config) => {
    // Set @ as root directory
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
