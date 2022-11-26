/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public',
// })

const withPWA = require("next-pwa")({
  dest: "public",
})


module.exports = withPWA({
 // reactStrictMode: true,
  images: {
    domains: ['content.jusoshd.uber.space',"scontent-frx5-1.cdninstagram.com", "scontent-frt3-1.cdninstagram.com",'scontent-frt3-2.cdninstagram.com','scontent-frx5-2.cdninstagram.com', 'scontent-muc2-1.cdninstagram.com'],
  },
});




