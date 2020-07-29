const { environment } = require('@rails/webpacker')

// Compile typescript
environment.loaders.prepend("tyepscript", {
  test: /.ts$/,
  use: "ts-loader"
})

module.exports = environment
