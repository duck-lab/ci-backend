'use strict'

module.exports = appInfo => {
  const config = exports = {}

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/checkIn_dev',
    options: {}
  }

  return config
}
