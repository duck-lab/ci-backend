'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB } = require('../../fixtures/db')

describe('Organization Service', () => {
  let createdOrganization = null

  before(() => flashDB(app.mongoose, 'checkIn_test'))

  describe('Create', () => {
    const testOrganization = {
      name: 'organizationName',
      logo: 'http://logo.com/logo',
      contact: '+86 201 1234567',
      email: 'ole3021@gmail.com',
      address: '上海市静安区',
      site: 'http://ole3021.me'
    }
    it('should create organization', async () => {
      const ctx = app.mockContext()

      const organization = await ctx.service.organization.create(testOrganization)
      createdOrganization = organization
      assert(organization)
      assert.equal(organization.name, 'organizationName')
      assert.equal(organization.logo, 'http://logo.com/logo')
      assert.equal(organization.contact, '+86 201 1234567')
      assert.equal(organization.email, 'ole3021@gmail.com')
      assert.equal(organization.address, '上海市静安区')
      assert.equal(organization.site, 'http://ole3021.me')
    })
  })

  describe('Find', () => {
    it('should find organization by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.organization.findByFilter({name: 'organizationName'})
      const organizationInfo = result.data[0]

      assert(result)
      assert(organizationInfo)
      assert.equal(result.meta.total, 1)

      assert.equal(organizationInfo.name, 'organizationName')
      assert.equal(organizationInfo.logo, 'http://logo.com/logo')
      assert.equal(organizationInfo.contact, '+86 201 1234567')
      assert.equal(organizationInfo.email, 'ole3021@gmail.com')
      assert.equal(organizationInfo.address, '上海市静安区')
      assert.equal(organizationInfo.site, 'http://ole3021.me')
    })

    it('should find organizationion by name', async () => {
      const ctx = app.mockContext()

      const organization = await ctx.service.organization.findByName('organizationName')
      assert(organization)
      assert.equal(organization.name, 'organizationName')
      assert.equal(organization.logo, 'http://logo.com/logo')
      assert.equal(organization.contact, '+86 201 1234567')
      assert.equal(organization.email, 'ole3021@gmail.com')
      assert.equal(organization.address, '上海市静安区')
      assert.equal(organization.site, 'http://ole3021.me')
    })

    it('should find user with userId', async () => {
      const ctx = app.mockContext()

      const organization = await ctx.service.organization.findById(createdOrganization.id)
      assert(organization)
      assert.equal(organization.name, 'organizationName')
      assert.equal(organization.logo, 'http://logo.com/logo')
      assert.equal(organization.contact, '+86 201 1234567')
      assert.equal(organization.email, 'ole3021@gmail.com')
      assert.equal(organization.address, '上海市静安区')
      assert.equal(organization.site, 'http://ole3021.me')
    })
  })

  describe('Update', () => {
    it('should update user several fileds with orgId', async () => {
      const ctx = app.mockContext()

      const organization = await ctx.service.organization.updateById(createdOrganization.id, {
        name: 'updatedName',
        contact: 'updateMobile'
      })

      assert(organization)
      assert.equal(organization.name, 'updatedName')
      assert.equal(organization.logo, 'http://logo.com/logo')
      assert.equal(organization.contact, 'updateMobile')
      assert.equal(organization.email, 'ole3021@gmail.com')
      assert.equal(organization.address, '上海市静安区')
      assert.equal(organization.site, 'http://ole3021.me')
    })
  })

  describe('Delete', () => {
    it('should delete org by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.organization.destroyByFilter({_id: createdOrganization.id})

      assert(result)
      assert(result.n === result.ok)
    })
  })
})
