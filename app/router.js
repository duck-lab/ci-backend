'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.api.status)

  // User route
  router.get('/users', controller.user.getAllUsers)
  router.post('/users', controller.user.createUser)
  router.get('/user', controller.user.getAuthUser)
  router.patch('/user', controller.user.updateAuthUser)
  router.get('/users/:username', controller.user.getByUsername)

  // Event route
  router.get('/events', controller.event.getAllEvents)
  router.post('/events', controller.event.createEvent)
  router.get('/user/events', controller.event.getAuthUserEvents)
  router.get('/users/:username/events', controller.getUserEvents)
  router.get('/events/:event', controller.event.getEvent)
  router.patch('/events/:event', controller.event.updateAnEvent)

  // Organizer route
  router.get('/orgs', controller.organizer.getAllOrganizer)
  router.post('/orgs', controller.organizer.createOrganizer)
  // router.get('/user/orgs', controller.organizer.getAuthUserOrganizers)
  // router.get('/users/:user/orgs', controller.organizer.getUserOrganizers)
  router.get('/orgs/:org', controller.organizer.getOrganize)
  router.patch('/orgs/:org', controller.organizer.updateOrganizer)

  // Registers route
  router.get('/events/:event/registers', controller.register.getEventRegisters)
  router.post('/events/:event/register-by-mobile', controller.register.createRegisterByMobile)
  router.put('/events/:event/register-by-mobile', controller.register.checkInRegisterByMobile)
  router.post('/events/:event/register/:user', controller.register.createRegister)
  router.put('/events/:event/register/:user', controller.register.checkInRegister)
  router.delete('/events/:event/registers/:user', controller.register.removeRegister)

  // Manager route
  router.get('/events/:event/managers', controller.manager.getEventManagers)
  router.post('/events/:event/managers/:user', controller.register.createEventManager)
  router.put('/events/:event/managers/:user', controller.register.udpateEventManager)
  router.delete('/events/:event/managers/:user', controller.register.removeRegister)
}
