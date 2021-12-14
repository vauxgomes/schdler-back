const User = require('../models/User')
const Project = require('../models/Project')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization

        const projects = await Project.find({ user: user_id }, [
            'name',
            'slots',
            'credits'
        ])

        if (!projects) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(projects)
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

        const { name, credits, slots } = request.body
        const project = await Project.create({
            user: user._id,
            name,
            credits,
            slots
        })

        user.projects.push(project)
        await user.save()

        return response.json({ _id: project._id, name })
    },

    // UPDATE
    async update(request, response) {
        const { _id } = request.params
        const user_id = request.headers.authorization
        const project = await Project.findOne({ _id, user: user_id })

        if (!project) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const {
            name = project.name,
            credits = project.credits,
            slots = project.slots
        } = request.body

        try {
            await Project.updateOne({ _id }, { name, credits, slots })
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
        const project = await Project.findOne({ _id, user: user_id })

        if (!project) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const user = await User.findOne({ _id: project.user })
        user.projects.splice(user.projects.indexOf(_id), 1)

        await user.save()
        await Project.deleteOne({ _id })

        return response.status(204).send()
    }
}
