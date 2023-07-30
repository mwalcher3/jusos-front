/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "uber.space",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    domains: [
      "content.jusoshd.uber.space",
      "video-muc2-1.cdninstagram.com",
      "video-dus1-1.cdninstagram.com",
      "scontent-dus1-1.cdninstagram.com",
      "video-muc2-1.cdninstagram.com",
      "scontent-frx5-1.cdninstagram.com",
      "scontent-frt3-1.cdninstagram.com",
      "scontent-frt3-2.cdninstagram.com",
      "scontent-frx5-2.cdninstagram.com",
      "scontent-muc2-1.cdninstagram.com",
    ],
  },
};
