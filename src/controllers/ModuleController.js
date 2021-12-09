const User = require('../models/User')
const Module = require('../models/Module')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization

        const subjects = await Module.find({ user: user_id }).sort({
            name: 1
        })

        if (!subjects) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(subjects)
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

        const { name, credits } = request.body
        const subject = await Module.create({ user: user._id, name, credits })

        return response.json({ _id: subject._id, name })
    },

    // UPDATE
    async update(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const subject = await Module.findOne({ _id, user: user_id })

        if (!subject) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { name = subject.name, credits = subject.credits } = request.body

        try {
            await Module.updateOne({ _id }, { name, credits })
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
        const status = await Module.deleteOne({ _id, user: user_id })

        if (!status.deletedCount) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.status(204).send()
    }
}
