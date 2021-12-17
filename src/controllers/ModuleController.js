const User = require('../models/User')
const Module = require('../models/Module')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization

        const modules = await Module.find({ user: user_id }).sort({
            created_at: 1
        })

        if (!modules) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(modules)
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

        const { name, credits, color } = request.body
        const module = await Module.create({
            user: user._id,
            name,
            credits,
            color
        })

        return response.json({ _id: module._id, name })
    },

    // UPDATE
    async update(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const module = await Module.findOne({ _id, user: user_id })

        if (!module) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const {
            name = module.name,
            credits = module.credits,
            color = module.color
        } = request.body

        try {
            await Module.updateOne({ _id }, { name, credits, color })
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
