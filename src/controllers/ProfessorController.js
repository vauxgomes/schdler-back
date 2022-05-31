const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const professors = await knex
            .select('id', 'name')
            .from('professors')
            .where({ user_id })

        return res.json(professors)
    },

    // Show
    async show(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        const professor = await knex
            .select('id', 'name')
            .from('professors')
            .where({ id, user_id })
            .first()

        return res.json(professor)
    },

    // Create
    async create(req, res) {
        try {
            const { name } = req.body
            const { id: user_id } = req.user

            const [id] = await knex('professors').insert({ name, user_id })

            return res.json({
                success: true,
                message: 'professor.create.ok',
                professor: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'professor.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('professors')
                .update({ name })
                .where({ id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'professor.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'professor.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'professor.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('professors').where({ id, user_id }).del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'professor.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'professor.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'professor.delete.err'
            })
        }
    }
}
