const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: ['127.0.0.1'],
},
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
