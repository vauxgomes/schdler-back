// Imports
const express = require('express')
const routes = express.Router()

// Middleware
const auth = require('./middleware/auth')

// Controllers
const AccountController = require('./controllers/AccountController')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const RelatedProjectController = require('./controllers/RelatedProjectController')
const ProfessorController = require('./controllers/ProfessorController')
const ModuleController = require('./controllers/ModuleController')
const LocationController = require('./controllers/LocationController')
const BlockController = require('./controllers/BlockController')
const BoardController = require('./controllers/BoardController')
const SlotController = require('./controllers/SlotController')

// Account
routes.post('/login', AccountController.register)

// Users
routes.get('/users', auth, UserController.index)
routes.get('/users/show/:id?', auth, UserController.show)
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
routes.get('/projects/:project_id/blocks', auth, BlockController.index)
routes.get('/projects/:project_id/blocks/:id', auth, BlockController.show)
routes.post('/projects/:project_id/blocks', auth, BlockController.create)
routes.delete('/projects/:project_id/blocks/:id', auth, BlockController.delete)

// Board
routes.get('/projects/:project_id/boards', auth, BoardController.index)
routes.post('/projects/:project_id/boards', auth, BoardController.create)
routes.put('/projects/:project_id/boards/:id', auth, BoardController.update)
routes.delete('/projects/:project_id/boards/:id', auth, BoardController.delete)

// Slot
routes.get('/boards/:board_id/slots', auth, SlotController.index)
routes.post('/boards/:board_id/slots', auth, SlotController.create)
routes.put('/boards/:board_id/slots/:id', auth, SlotController.update)
routes.delete('/boards/:board_id/slots/:id', auth, SlotController.delete)

// Related Projects
// Related Projects
routes.get(
    '/projects/:project_id/related',
    auth,
    RelatedProjectController.index
)
routes.post(
    '/projects/:project_id/related',
    auth,
    RelatedProjectController.create
)
routes.delete(
    '/projects/:project_id/related/:code',
    auth,
    RelatedProjectController.delete
)

// Export
module.exports = routes
