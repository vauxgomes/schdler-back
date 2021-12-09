const User = require('../models/User')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    // INDEX
    async index(request, response) {
        const users = await User.find({}, ['name', 'login'])

        if (!users) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(users)
    },

    // CREATE
    async create(request, response) {
        const { name, login, pass } = request.body

        const user = await User.create({
            name,
            login,
            pass: bcrypt.hashSync(pass),
            projects: []
        })

        return response.json({ _id: user._id, name })
    },

    // UPDATE
    async update(request, response) {
        const _id = request.headers.authorization
        const user = await User.findOne({ _id })

        if (!user) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const {
            name = user.name,
            login = user.login,
            pass = user.pass
        } = request.body

        let pass_ = pass
        if (!request.body.pass) {
            pass_ = bcrypt.hashSync(pass)
        }

        try {
            await User.updateOne({ _id }, { name, login, pass: pass_ })
            return response.status(204).send()
        } catch (error) {
            return response.status(403).json({
                error: 'Not Allowed'
            })
        }
    }
}
