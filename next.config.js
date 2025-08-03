module.exports = {
  images: {
    domains: ['images.microcms-assets.io'],
    unoptimized: true, // ← これを追加
  },
  output: 'export', // Next.js 13以降の設定例
  basePath: '/myportfolio',
  assetPrefix: '/myportfolio/',
};