// next.config.js
const path = require("path");

module.exports = {
  webpack: (config) => {
    // Set @ as root directory
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
