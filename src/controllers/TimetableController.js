const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const { project_id } = req.params

        const timetables = await knex
            .select('id', 'project_id', 'start', 'end', 'shift')
            .from('timetables')
            .where({ project_id, user_id })
            .orderBy('start', 'asc')
            .orderBy('end', 'asc')

        return res.json(timetables)
    },

    // Create
    async create(req, res) {
        try {
            const { start, end, shift } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const [id] = await knex('timetables').insert({
                project_id,
                start,
                end,
                shift,
                user_id
            })

            return res.json({
                success: true,
                message: 'timetable.create.ok',
                data: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'timetable.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { start, end, shift } = req.body
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('timetables')
                .update({ start, end, shift })
                .where({ id, project_id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'timetable.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'timetable.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'timetable.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('timetables')
                .where({ id, project_id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'timetable.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'timetable.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'timetable.delete.err'
            })
        }
    }
}
