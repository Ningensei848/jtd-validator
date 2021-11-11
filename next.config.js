module.exports = {
  // cf. https://nextjs.org/docs/upgrading#swc-replacing-terser-for-minification
  swcMinify: true,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  trailingSlash: true,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  assetPrefix: process.env.BASE_PATH || '',
  // cf. https://nextjs.org/docs/api-reference/next.config.js/basepath
  basePath: process.env.BASE_PATH || '',
}
