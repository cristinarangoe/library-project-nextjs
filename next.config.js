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
};

module.exports = nextConfig;
