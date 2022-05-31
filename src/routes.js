// Imports
const express = require('express')
const routes = express.Router()

// Middleware
const auth = require('./middleware/auth')

// Controllers
const AccountController = require('./controllers/AccountController')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const LocationController = require('./controllers/LocationController')

// Account
routes.post('/login', AccountController.register)

// Users
routes.get('/users', auth, UserController.index)
routes.get('/users/show', auth, UserController.show)
routes.get('/users/show/:id', auth, UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/', auth, UserController.update)
routes.delete('/users/', auth, UserController.delete)

// Projects
routes.get('/projects', auth, ProjectController.index)
routes.get('/projects/:id', auth, ProjectController.show)
routes.post('/projects', auth, ProjectController.create)
routes.put('/projects/:id', auth, ProjectController.update)
routes.delete('/projects/:id', auth, ProjectController.delete)

// Locations
routes.get('/locations', auth, LocationController.index)
routes.get('/locations/:id', auth, LocationController.show)
routes.post('/locations', auth, LocationController.create)
routes.put('/locations/:id', auth, LocationController.update)
routes.delete('/locations/:id', auth, LocationController.delete)

// Export
module.exports = routes
