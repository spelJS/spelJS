const plugins = [
  require('postcss-import')(),
  require('postcss-url')({ url: 'copy', useHash: true })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    require('postcss-csso')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('autoprefixer')()
  );
}

module.exports = { plugins };
