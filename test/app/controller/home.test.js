'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('api.js', () => {
  it('should assert', function * () {
    const pkg = require('../../../package.json')
    assert(app.config.keys.startsWith(pkg.name))
  })

  it('should GET status', () => {
    return app.httpRequest()
      .get('/')
      .expect(200)
      .expect.equal('good')
  })
})
