const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const modules = await knex
            .select('id', 'name', 'credits')
            .from('modules')
            .where({ user_id })
            .orderBy('name', 'asc')

        return res.json(modules)
    },

    // Show
    async show(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        const module = await knex
            .select('id', 'name', 'credits')
            .from('modules')
            .where({ id, user_id })
            .first()

        return res.json(module)
    },

    // Create
    async create(req, res) {
        try {
            const { name, credits } = req.body
            const { id: user_id } = req.user

            const [id] = await knex('modules').insert({
                name,
                credits,
                user_id
            })

            return res.json({
                success: true,
                message: 'module.create.ok',
                data: { id }
            })
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                success: false,
                message: 'module.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('modules')
                .update({ name })
                .where({ id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'module.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'module.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'module.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('modules').where({ id, user_id }).del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'module.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'module.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'module.delete.err'
            })
        }
    }
}
