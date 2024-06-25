const path = require('path')
 
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/beers',
        permanent: true,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'sass')],
  },
}