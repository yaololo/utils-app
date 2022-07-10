// next.config.js
const path = require("path");
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
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
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "zh"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",

    // disable automatically locale detection
    localeDetection: false,
  },
});
