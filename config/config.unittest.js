'use strict'

module.exports = appInfo => {
  const config = exports = {}

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/checkIn_test',
    options: {}
  }

  config.security = {
    csrf: {
      enable: false // Disable CSRF for test
    }
  }

  return config
}
