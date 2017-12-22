'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async status () {
    this.ctx.body = 'good'
  }
}

module.exports = HomeController
