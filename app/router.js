'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.api.status)

  // Auth route
  router.post('/login', app.oAuth2Server.token())
  // TODO: 再egg-oauth2server 中实现
  // router.app('/logout', app.oAuth2Server.model.revokeToken())

  // TODO: 实现用户认证和测试
  // , app.oAuth2Server.authenticate()

  // User route
  router.get('/users', controller.user.getAllUsers) // 查看和搜索用户
  router.post('/users', controller.user.createUser) // 注册用户
  router.get('/user', controller.user.getAuthUser) // 获取当前登陆用户信息 >> 认证用户
  router.patch('/user', controller.user.updateAuthUser) // 更新当前登陆用户信息 >> 认证用户
  router.get('/users/:username', controller.user.getByUsername) // 获取指定用户信息
  router.get('/users/:username', controller.user.getByUsername) // 获取指定用户信息
  // TODO: Banne User route

  // Event route
  router.get('/events', controller.event.getAllEvents) // 查看和搜索活动
  router.post('/events', controller.event.createEvent) // 创建活动 >> 认证用户
  router.get('/user/events', controller.event.getAuthUserEvents) // 获取当前登陆用户的活动
  router.get('/users/:username/events', controller.event.getUserEvents) // 获取指定用户的活动
  router.get('/events/:event', controller.event.getEvent) // 获取活动通过活动名称
  router.patch('/events/:event', controller.event.updateAnEvent) // 更新活动通过活动名称 >> 认证用户

  // Registers route
  router.get('/events/:event/registers', controller.register.getEventRegisters) // 获取活动注册用户
  router.post('/events/:event/register', controller.register.createAuthUserRegister) // 注册活动当前登陆用户 >> 认证用户
  router.get('/user/events', controller.event.getAuthUserEvents) // 获取当前登陆用户的活动 >> 认证用户
  router.post('/events/:event/register/:user', controller.register.createRegister) // 注册活动用户(管理员) >> 认证用户
  router.put('/events/:event/checkin', controller.register.checkInAuthUserRegister) // 签到活动当前登陆用户 >> 认证用户
  router.put('/events/:event/checkin/:user', controller.register.checkInRegister) // 签到活动用户(管理员) >> 认证用户
  router.put('/events/:event/cancel', controller.register.cancelAuthUserRegister) // 取消签到活动当前登陆用户 >> 认证用户
  router.put('/events/:event/cancel/:user', controller.register.cancelRegister) // 取消签到活动用户(管理员) >> 认证用户
  router.delete('/events/:event/registers/:user', controller.register.removeRegister) // 删除活动注册用户(管理员) >> 认证用户
  // TODO：处理无账号的手机用户
  // router.post('/events/:event/register-by-mobile', controller.register.createRegisterByMobile)
  // router.put('/events/:event/register-by-mobile', controller.register.checkInRegisterByMobile)

  // Organizer route
  router.get('/orgs', controller.organizer.getAllOrganizers) // 查看和搜索所有组织
  router.post('/orgs', controller.organizer.createOrganizer) // 创建组织 >> 认证用户
  router.get('/user/orgs', controller.organizer.getAuthUserOrganizers) // 获取当前登陆用户的组织
  router.get('/users/:user/orgs', controller.organizer.getUserOrganizers) // 获取指定用户的组织
  router.get('/orgs/:org', controller.organizer.getOrganize) // 获取组织通过组织名称
  router.patch('/orgs/:org', controller.organizer.updateOrganizer) // 更新组织通过活动名称 >> 认证用户

  // Manager route
  router.get('/events/:event/managers', controller.manager.getEventManagers) // 查看活动的所有管理者
  router.post('/events/:event/managers/:user', controller.manager.createEventManager) // 注册活动的管理者(管理员) >> 认证用户
  router.put('/events/:event/managers/:user', controller.manager.udpateEventManager) // 更新活动的管理者(管理员) >> 认证用户
  router.delete('/events/:event/managers/:user', controller.manager.removeEventManager) // 删除活动管理者(管理员) >> 认证用户
  router.post('/orgs/:org/managers/:user', controller.manager.createOrgManager) // 注册组织的管理者(管理员) >> 认证用户
  router.put('/orgs/:org/managers/:user', controller.manager.udpateOrgManager) // 更新组织的管理者(管理员) >> 认证用户
  router.delete('/orgs/:org/managers/:user', controller.manager.removeOrgManager) // 删除活动管理者(管理员) >> 认证用户
}
