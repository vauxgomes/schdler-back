const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const { project_id } = req.params

        const professors = await knex
            .select('id', 'project_id', 'name', 'short', 'code', 'color')
            .from('professors')
            .where({ project_id, user_id })
            .orderBy('name', 'asc')

        return res.json(professors)
    },

    // Create
    async create(req, res) {
        try {
            const { name, short, code, color } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const [id] = await knex('professors').insert({
                project_id,
                name,
                short,
                code,
                color,
                user_id
            })

            return res.json({
                success: true,
                message: 'professor.create.ok',
                data: { id }
            })
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                success: false,
                message: 'professor.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name, short, code, color } = req.body
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('professors')
                .update({ name, short, code, color })
                .where({ id, project_id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    message: 'professor.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    message: 'professor.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: 'professor.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('professors')
                .where({ id, project_id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    message: 'professor.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    message: 'professor.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: 'professor.delete.err'
            })
        }
    }
}
