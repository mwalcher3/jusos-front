const withPWA = require('next-pwa')({
  dest: 'public'
})


module.exports = withPWA({
  pwa:{
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['content.jusoshd.uber.space', 'scontent-muc2-1.cdninstagram.com'],
  },
})




