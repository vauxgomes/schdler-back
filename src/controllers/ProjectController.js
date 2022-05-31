const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const projects = await knex
            .select('id', 'name')
            .from('projects')
            .where({ user_id })

        return res.json(projects)
    },

    // Show
    async show(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        const project = await knex
            .select('id', 'name')
            .from('projects')
            .where({ id, user_id })
            .first()

        return res.json(project)
    },

    // Create
    async create(req, res) {
        try {
            const { name } = req.body
            const { id: user_id } = req.user

            const [id] = await knex('projects').insert({ name, user_id })

            return res.json({
                success: true,
                message: 'project.create.ok',
                project: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'project.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('projects')
                .update({ name })
                .where({ id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'project.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'project.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'project.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('projects').where({ id, user_id }).del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'project.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'project.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'project.delete.err'
            })
        }
    }
}
