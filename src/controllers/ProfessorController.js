const User = require('../models/User')
const Professor = require('../models/Professor')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization

        const professors = await Professor.find({ user: user_id }).sort({
            name: 1
        })

        if (!professors) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(professors)
    },

    // CREATE
    async create(request, response) {
        const user_id = request.headers.authorization
        const user = await User.findOne({ _id: user_id })

        if (!user) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { name } = request.body
        const professor = await Professor.create({ user: user._id, name })

        return response.json({ _id: professor._id, name })
    },

    // UPDATE
    async update(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const professor = await Professor.findOne({ _id, user: user_id })

        if (!professor) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { name = professor.name } = request.body

        try {
            await Professor.updateOne({ _id }, { name })
            return response.status(204).send()
        } catch (error) {
            return response.status(403).json({
                error: 'Not Allowed'
            })
        }
    },

    // DELETE
    async delete(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const status = await Professor.deleteOne({ _id, user: user_id })

        if (!status.deletedCount) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.status(204).send()
    }
}
