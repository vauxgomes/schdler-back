// Imports
const express = require('express')
const routes = express.Router()

// Middleware
const auth = require('./middleware/auth')

// Controllers
const AccountController = require('./controllers/AccountController')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ProfessorController = require('./controllers/ProfessorController')
const ModuleController = require('./controllers/ModuleController')
const LocationController = require('./controllers/LocationController')
const BlockController = require('./controllers/BlockController')

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

// Professor
routes.get('/professors', auth, ProfessorController.index)
routes.get('/professors/:id', auth, ProfessorController.show)
routes.post('/professors', auth, ProfessorController.create)
routes.put('/professors/:id', auth, ProfessorController.update)
routes.delete('/professors/:id', auth, ProfessorController.delete)

// Module
routes.get('/modules', auth, ModuleController.index)
routes.get('/modules/:id', auth, ModuleController.show)
routes.post('/modules', auth, ModuleController.create)
routes.put('/modules/:id', auth, ModuleController.update)
routes.delete('/modules/:id', auth, ModuleController.delete)

// Locations
routes.get('/locations', auth, LocationController.index)
routes.get('/locations/:id', auth, LocationController.show)
routes.post('/locations', auth, LocationController.create)
routes.put('/locations/:id', auth, LocationController.update)
routes.delete('/locations/:id', auth, LocationController.delete)

// Block
routes.get('/blocks', auth, BlockController.index)
routes.get('/blocks/:id', auth, BlockController.show)
routes.post('/blocks', auth, BlockController.create)
routes.put('/blocks/:id', auth, BlockController.update)
routes.delete('/blocks/:id', auth, BlockController.delete)

// Export
module.exports = routes
