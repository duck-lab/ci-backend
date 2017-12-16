'use strict'

require('dotenv').config() // Load .env with secret Ids and Keys to process.env

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511354917609_8659'

  config.mongoose = {
    url: 'mongodb://127.0.0.1/checkIn_dev',
    options: {}
  }

  // add your config here
  config.middleware = []

  config.auth = {
    saltRounds: 10
  }

  config.oAuth2Server = {
    debug: config.env = 'development',
    grants: ['password', 'client_credentials']
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  return config
}
