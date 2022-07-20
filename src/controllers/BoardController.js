const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { project_id } = req.params
        const { id: user_id } = req.user

        const timetables = await knex
            .select('start', 'end', 'shift', 'start', 'end')
            .from('timetables')

        const boards = await knex
            .select(
                'boards.id',
                'name',
                'boards.shift',
                knex.raw('GROUP_CONCAT(timetables.start) as starts'),
                knex.raw('GROUP_CONCAT(timetables.end) as ends')
            )
            .from('boards')
            .innerJoin('timetables', 'timetables.shift', 'boards.shift')
            .where({
                'boards.project_id': project_id,
                'boards.user_id': user_id
            })
            .groupBy('boards.id')
            .then((boards) => {
                boards.forEach((b) => {
                    if (b.starts) b.starts = b.starts.split(',')
                    if (b.ends) b.ends = b.ends.split(',')
                })

                return res.json(boards)
            })

        // .then((t) => (timetables[t.shift] = { start, end } = t))
    },

    // Create
    async create(req, res) {
        try {
            const { project_id } = req.params
            const { name, shift } = req.body
            const { id: user_id } = req.user

            const [id] = await knex('boards').insert({
                project_id,
                name,
                shift,
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
        const { name, shift } = req.body
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('boards')
                .update({ name, shift })
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
