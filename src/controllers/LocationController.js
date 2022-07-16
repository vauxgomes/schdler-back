const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const { project_id } = req.params

        const locations = await knex
            .select(
                'id',
                'project_id',
                'name',
                'short',
                'code',
                'color',
                'capacity'
            )
            .from('locations')
            .where({ project_id, user_id })

        return res.json(locations)
    },

    // Create
    async create(req, res) {
        try {
            const { name, short, code, color, capacity } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const [id] = await knex('locations').insert({
                project_id,
                name,
                short,
                code,
                color,
                capacity,
                user_id
            })

            return res.json({
                success: true,
                message: 'location.create.ok',
                data: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'location.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name, short, code, color, capacity } = req.body
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('locations')
                .update({ name, short, code, color, capacity })
                .where({ id, project_id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'location.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'location.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'location.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('locations')
                .where({ id, project_id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'location.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'location.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'location.delete.err'
            })
        }
    }
}
