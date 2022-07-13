const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { project_id } = req.params
        const { id: user_id } = req.user
        const projects = await knex
            .select('id', 'name', 'period', 'size')
            .from('boards')
            .where({ project_id, user_id })

        return res.json(projects)
    },

    // Create
    async create(req, res) {
        try {
            const { project_id } = req.params
            const { name, period, times } = req.body
            const { id: user_id } = req.user

            // Size
            const size =
                (period === 'D' ? 2 * times : times) * (process.env.DAYS ?? 5)

            const [id] = await knex('boards').insert({
                name,
                period,
                size,
                project_id,
                user_id
            })

            return res.json({
                success: true,
                message: 'board.create.ok',
                data: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'board.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { name } = req.body
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('boards')
                .update({ name })
                .where({ id, project_id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'board.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'board.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'board.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('boards')
                .where({ project_id, id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'board.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'board.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'board.delete.err'
            })
        }
    }
}
