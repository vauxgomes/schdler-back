// Imports
const express = require('express')
const routes = express.Router()

// Middleware
const auth = require('./middleware/auth')
const delay = require('./middleware/delay')

// Controllers
const AccountController = require('./controllers/AccountController')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const RelatedProjectController = require('./controllers/RelatedProjectController')
const ProfessorController = require('./controllers/ProfessorController')
const ModuleController = require('./controllers/ModuleController')
const LocationController = require('./controllers/LocationController')
const TimetableController = require('./controllers/TimetableController')
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
routes.post('/projects', auth, ProjectController.create)
routes.put('/projects/:id', auth, ProjectController.update)
routes.delete('/projects/:id', auth, ProjectController.delete)

// Professor
routes.get('/projects/:project_id/professors', auth, ProfessorController.index)
routes.post(
    '/projects/:project_id/professors',
    auth,
    ProfessorController.create
)
routes.put(
    '/projects/:project_id/professors/:id',
    auth,
    ProfessorController.update
)
routes.delete(
    '/projects/:project_id/professors/:id',
    auth,
    ProfessorController.delete
)

// Module
routes.get('/projects/:project_id/modules', auth, ModuleController.index)
routes.post('/projects/:project_id/modules', auth, ModuleController.create)
routes.put('/projects/:project_id/modules/:id', auth, ModuleController.update)
routes.delete(
    '/projects/:project_id/modules/:id',
    auth,
    ModuleController.delete
)

// Locations
routes.get('/projects/:project_id/locations', auth, LocationController.index)
routes.post('/projects/:project_id/locations', auth, LocationController.create)
routes.put(
    '/projects/:project_id/locations/:id',
    auth,
    LocationController.update
)
routes.delete(
    '/projects/:project_id/locations/:id',
    auth,
    LocationController.delete
)

// Timetables
routes.get('/projects/:project_id/timetables', auth, TimetableController.index)
routes.post(
    '/projects/:project_id/timetables',
    auth,
    TimetableController.create
)
routes.put(
    '/projects/:project_id/timetables/:id',
    auth,
    TimetableController.update
)
routes.delete(
    '/projects/:project_id/timetables/:id',
    auth,
    TimetableController.delete
)

// Block
routes.get('/projects/:project_id/blocks', auth, BlockController.index)
routes.post('/projects/:project_id/blocks', auth, BlockController.create)
routes.delete('/projects/:project_id/blocks/:id', auth, BlockController.delete)

// Board
routes.get('/projects/:project_id/boards', auth, BoardController.index)
routes.post('/projects/:project_id/boards', auth, BoardController.create)
routes.put('/projects/:project_id/boards/:id', auth, BoardController.update)
routes.delete('/projects/:project_id/boards/:id', auth, BoardController.delete)

// Slot
routes.post('/projects/:project_id/slots', auth, SlotController.create)
routes.put('/projects/:project_id/slots/:id', auth, SlotController.update)
routes.delete('/projects/:project_id/slots/:id', auth, SlotController.delete)

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
routes.get(
    '/projects/:project_id/related/boards',
    auth,
    RelatedProjectController.index
)

// Export
module.exports = routes
