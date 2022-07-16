const knex = require('../database')
const uuid = require('uuid')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const projects = await knex
            .select('id', 'name', 'code', 'created_at')
            .from('projects')
            .where({ user_id })
            .orderBy('created_at', 'desc')

        return res.json(projects)
    },

    // Create
    async create(req, res) {
        try {
            const { name } = req.body
            const { id: user_id } = req.user
            const code = uuid.v4()

            const [id] = await knex('projects').insert({ name, code, user_id })

            return res.json({
                success: true,
                message: 'project.create.ok',
                data: { id, code }
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
