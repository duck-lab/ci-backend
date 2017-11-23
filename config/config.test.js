'use strict'

module.exports = appInfo => {
  const config = exports = {}

  config.mongoose = {
    url: 'mongodb://127.0.0.1/checkIn_dev',
    options: {}
  }

  return config
}
