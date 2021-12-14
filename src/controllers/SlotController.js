const Board = require('../models/Board')
const Slot = require('../models/Slot')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization
        const { board_id } = request.params

        const slots = await Slot.find({
            user: user_id,
            board: board_id
        })
            .select(['index', 'block'])
            .populate({
                path: 'block',
                select: ['professor', 'module', 'location'],
                populate: [
                    {
                        path: 'professor',
                        select: 'name'
                    },
                    {
                        path: 'module',
                        select: ['name', 'credits']
                    },
                    {
                        path: 'location',
                        select: ['name', 'capacity']
                    }
                ]
            })
            .sort({ block: 1 })

        if (!slots) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(slots)
    },

    // CREATE
    async create(request, response) {
        const user_id = request.headers.authorization
        const { board_id } = request.params

        const board = await Board.findOne({
            _id: board_id,
            user: user_id
        })

        if (!board) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { index, block } = request.body

        const slot = await Slot.create({
            user: user_id,
            project: board.project,
            board: board_id,
            index,
            block
        })

        board.slots.push(slot)
        await board.save()

        return response.json({ _id: slot._id })
    },

    // DELETE
    async delete(request, response) {
        const user_id = request.headers.authorization
        const { _id, board_id } = request.params

        const slot = await Slot.findOne({
            _id,
            board: board_id,
            user: user_id
        })

        if (!slot) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const board = await Board.findOne({ _id: board_id })
        board.slots.splice(board.slots.indexOf(_id), 1)

        await board.save()
        await Slot.deleteOne({ _id })

        return response.status(204).send()
    }
}
