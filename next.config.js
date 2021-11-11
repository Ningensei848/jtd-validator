
const assetPrefix = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : ''

module.exports = {
  // cf. https://nextjs.org/docs/upgrading#swc-replacing-terser-for-minification
  swcMinify: true,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  trailingSlash: process.env.BASE_PATH ? true : false,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  assetPrefix: process.env.CDN_URL || assetPrefix,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/basepath
  basePath: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '',

  // publicRuntimeConfig: cf. https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  publicRuntimeConfig: {
    assetPrefix
  },
}
