module.exports = {
  title: 'Dacom Components',
  components: 'src/**/[A-Z]*.js',
  theme: {
		font: ['IBM Plex Sans', 'Helvetica', 'sans-serif'],
  },
  require: [
    '@devniel/carbon-components/css/carbon-components.min.css'
  ],
  styleguideDir: 'docs',
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!postcss-loader'
        }
      ]
    }
  }

}
