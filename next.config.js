const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === "development"
})


module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['content.jusoshd.uber.space', 'scontent-muc2-1.cdninstagram.com'],
  },
})




