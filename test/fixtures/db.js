'use strict'

const injector = require('moh-mongo-injector')

exports.flashDB = (mongoose, databaseName) => {
  return Promise.all(mongoose.modelNames().map(modelName =>
    mongoose.model(modelName).collection.remove()))
}

exports.fixData = (mongoose, source) => {
  return injector(source, { models: mongoose.models })
}
