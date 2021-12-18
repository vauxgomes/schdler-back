const Project = require('../models/Project')
const Board = require('../models/Board')
const Slot = require('../models/Slot')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization
        const { project_id } = request.params

        const boards = await Board.find({
            user: user_id,
            project: project_id
        }).populate([
            {
                path: 'slots',
                select: ['board', 'index', 'block'],
                populate: {
                    path: 'block'
                }
            }
        ])

        if (!boards) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(boards)
    },

    // CREATE
    async create(request, response) {
        const user_id = request.headers.authorization
        const { project_id } = request.params

        const project = await Project.findOne({
            _id: project_id,
            user: user_id
        })

        if (!project) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { title, period } = request.body

        const board = await Board.create({
            user: user_id,
            project: project_id,
            title,
            period
        })

        // Filling slots
        for (let index = 0; index < project.slots; index++) {
            let slot = await Slot.create({
                user: user_id,
                project: project_id,
                board: board._id,
                index,
                block: null
            })

            board.slots.push(slot)
        }

        await board.save()
        return response.json(board)
    },

    // UPDATE
    async update(request, response) {
        const { _id, project_id } = request.params
        const user_id = request.headers.authorization

        const board = await Board.findOne({ _id, user: user_id })

        if (!board) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { title = board.title, period = board.period } = request.body

        try {
            await Board.updateOne({ _id }, { title, period })
            return response.status(204).send()
        } catch (error) {
            return response.status(403).json({
                error: 'Not Allowed'
            })
        }
    },

    // DELETE
    async delete(request, response) {
        const { _id, project_id } = request.params
        const user_id = request.headers.authorization

        const board = await Board.findOne({
            _id,
            user: user_id,
            project: project_id
        })

        if (!board) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        await Slot.deleteMany({ user: user_id, board: board._id })
        await Board.deleteOne({ _id, user: user_id })

        return response.status(204).send()
    }
}
