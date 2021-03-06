require('dotenv').config({silent: true})
const path = require('path')
const express = require('express')
const app = express()

if (!+process.env.PRODUCTION) {
  require('babel-register')({presets: ['es2015']})
  const webpackCompiler = require('webpack')(require('./webpack.config.babel'))
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const gulp = require('gulp')
  require('./gulpfile')

  app.use(webpackDevMiddleware(webpackCompiler, {noInfo: true}))
  app.use(webpackHotMiddleware(webpackCompiler))

  process.nextTick(() => {
    // Solution source: https://github.com/gulpjs/gulp/issues/770#issuecomment-63106755
    gulp.start('watch')
  })
}

const PORT = +process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, 'src')))

app.get('/', (req, res) => { res.redirect('/login/') })

app.listen(PORT, () => {
  console.log(`Server started at "http://0.0.0.0:${PORT}/".`)
})
