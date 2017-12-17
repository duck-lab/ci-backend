// 'use strict'

// const { app, assert } = require('egg-mock/bootstrap')
// const { flashDB } = require('../../fixtures/db')

// describe('Register Service', () => {
//   let createdRegister = null
//   let rUser = null
//   let rEvent = null
//   let testRegister1 = null

//   before(() => flashDB(app.mongoose, 'checkIn_test'))

//   describe('Create', () => {
//     const testUser1 = {
//       password: 'regTestPassword',
//       secretSalt: 'regTestSalt',
//       mobile: '+86 18303033333',
//       email: 'ole3023@gmail.com',
//       username: 'ole3033',
//       realName: 'Oliver.W',
//       country: 'China',
//       province: '上海',
//       city: '上海',
//       address: '静安区'
//     }

//     const testEvent1 = {
//       title: 'regTestEvnet',
//       postImage: 'RegTestImage',
//       eventStartAt: new Date('2017-11-20'),
//       eventEndAt: new Date('2017-11-21'),
//       checkInStartAt: new Date('2017-11-20'),
//       checkInEndAt: new Date('2017-11-20'),
//       country: 'China',
//       province: '上海',
//       city: '上海',
//       address: '静安区',
//       checkInType: 'QR_CODE_GENERAL'
//     }

//     before(async () => {
//       const ctx = app.mockContext()

//       rUser = await ctx.service.user.create(testUser1)
//       rEvent = await ctx.service.event.create(testEvent1)

//       testRegister1 = {
//         user: rUser.id,
//         event: rEvent.id,
//         registCode: 'testRegCode1'
//       }
//     })

//     it('should create register', async () => {
//       const ctx = app.mockContext()

//       const register = await ctx.service.register.create(testRegister1)
//       createdRegister = register
//       assert(createdRegister)
//       assert.equal(createdRegister.user, rUser.id)
//       assert.equal(createdRegister.event, rEvent.id)
//       assert.equal(createdRegister.registCode, 'testRegCode1')
//     })
//   })

//   describe('Find', () => {
//     it('should get resgister by registCode', async () => {
//       const ctx = app.mockContext()

//       const result = await ctx.service.register.find({registCode: 'testRegCode1'})
//       const registerInfo = result.data[0]

//       assert(result)
//       assert(registerInfo)
//       assert.equal(result.meta.total, 1)

//       assert.equal(registerInfo.user, rUser.id)
//       assert.equal(registerInfo.event.id, rEvent.id)
//       assert.equal(registerInfo.registCode, 'testRegCode1')
//     })

//     it('should get resgister with userId', async () => {
//       const ctx = app.mockContext()

//       const register = await ctx.service.register.findById(createdRegister.id)
//       assert(register)
//       assert.equal(register.user, rUser.id)
//       assert.equal(register.event, rEvent.id)
//       assert.equal(register.registCode, 'testRegCode1')
//     })
//   })

//   describe('Update', () => {
//     it('should update resgister several fileds with id', async () => {
//       const ctx = app.mockContext()

//       const register = await ctx.service.register.update(createdRegister.id, {
//         isRegisted: 'true'
//       })

//       assert(register)
//       assert.equal(register.user, rUser.id)
//       assert.equal(register.event, rEvent.id)
//       assert.equal(register.registCode, 'testRegCode1')
//       assert.equal(register.isRegisted, true)
//     })
//   })

//   describe('Delete', () => {
//     it('should delete resgister in the list of uids', async () => {
//       const ctx = app.mockContext()

//       const result = await ctx.service.register.destroy([createdRegister.id])

//       assert(result)
//       assert.equal(result.n, result.ok)
//     })
//   })
// })
