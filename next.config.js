/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    NEXTAUTH_SECRET: "cristinarangoe",
    GOOGLE_CLIENT_ID: "1021779453072-tbsrrpkk8rsvrr0ke9ji7t4ic2iaja09.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_ID: "63f2b35cc32ff7e00630",
    GITHUB_SECRET: "e71e9d175c184074b747fce4e403b42165a2e917",
  }
};

module.exports = nextConfig;
