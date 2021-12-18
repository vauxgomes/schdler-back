const express = require('express')
const routes = express.Router()

const SystemController = require('./controllers/SystemController')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const LocationController = require('./controllers/LocationController')
const ModuleController = require('./controllers/ModuleController')
const ProfessorController = require('./controllers/ProfessorController')
const BoardController = require('./controllers/BoardController')
const BlockController = require('./controllers/BlockController')
const SlotController = require('./controllers/SlotController')

// System route
routes.get('/sys', SystemController.index)

// Users
routes.get('/users', UserController.index)
routes.post('/users/session', UserController.show)
routes.post('/users/create', UserController.create)
routes.put('/users/update', UserController.update)

// Projects
routes.get('/projects', ProjectController.index)
routes.post('/projects/create', ProjectController.create)
routes.put('/projects/:_id/update', ProjectController.update)
routes.delete('/projects/:_id/delete', ProjectController.delete)

// Locations
routes.get('/locations', LocationController.index)
routes.post('/locations/create', LocationController.create)
routes.put('/locations/:_id/update', LocationController.update)
routes.delete('/locations/:_id/delete', LocationController.delete)

// Modules
routes.get('/modules', ModuleController.index)
routes.post('/modules/create', ModuleController.create)
routes.put('/modules/:_id/update', ModuleController.update)
routes.delete('/modules/:_id/delete', ModuleController.delete)

// Professors
routes.get('/professors', ProfessorController.index)
routes.post('/professors/create', ProfessorController.create)
routes.put('/professors/:_id/update', ProfessorController.update)
routes.delete('/professors/:_id/delete', ProfessorController.delete)

// Project/Blocks
routes.get('/projects/:project_id/blocks', BlockController.index)
routes.post('/projects/:project_id/blocks/create', BlockController.create)
routes.put('/projects/:project_id/blocks/:_id/update', BlockController.update)
routes.delete(
    '/projects/:project_id/blocks/:_id/delete',
    BlockController.delete
)

// Project/Boards
routes.get('/projects/:project_id/boards', BoardController.index)
routes.post('/projects/:project_id/boards/create', BoardController.create)
routes.put('/projects/:project_id/boards/:_id/update', BoardController.update)
routes.delete(
    '/projects/:project_id/boards/:_id/delete',
    BoardController.delete
)

// Boards/Slot
routes.get('/boards/:board_id/slots', SlotController.index)
// routes.post('/boards/:board_id/slots/create', SlotController.create)
// routes.delete('/boards/:board_id/slots/:_id/delete', SlotController.delete)

// Export
module.exports = routes
