const User = require('../models/User')
const Location = require('../models/Location')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization

        const locations = await Location.find({ user: user_id }).sort({
            name: 1,
            capacity: 1
        })

        if (!locations) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(locations)
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

        const { name, capacity } = request.body
        const location = await Location.create({ user: user._id, name, capacity })

        return response.json({ _id: location._id, name })
    },

    // UPDATE
    async update(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const location = await Location.findOne({ _id, user: user_id })

        if (!location) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { name = location.name, capacity = location.capacity } = request.body

        try {
            await Location.updateOne({ _id }, { name, capacity })
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
        const status = await Location.deleteOne({ _id, user: user_id })

        if (!status.deletedCount) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.status(204).send()
    }
}
