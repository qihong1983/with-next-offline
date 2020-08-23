const withOffline = require('next-offline')

// module.exports = withOffline({
//   workboxOpts: {
//     swDest: process.env.NEXT_EXPORT
//       ? 'service-worker.js'
//       : 'static/service-worker.js',
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,
//         handler: 'NetworkFirst',
//         options: {
//           cacheName: 'offlineCache',
//           expiration: {
//             maxEntries: 200,
//           },
//         },
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/service-worker.js',
//         destination: '/_next/static/service-worker.js',
//       },
//     ]
//   },
// })


const path = require('path')
const withOffline = require('next-offline')

const withSass = require('@zeit/next-sass');

const withManifest = require('next-manifest')
const isDev = process.env.NODE_ENV !== 'production'


const config = {
  distDir: 'build',
  manifest: {
    "name": "Nevek.co",
    "short_name": "nevek.co",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#FFE066",
    "theme_color": "#FFE066",
    icons: false
  }
}


module.exports = withOffline({
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
})