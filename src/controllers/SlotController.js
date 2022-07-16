const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { board_id } = req.params
        const { id: user_id } = req.user
        const slots = await knex
            .select(
                'slots.id',
                'index',
                'board_id',
                'block_id',
                'professors.id as professor_id',
                'professors.name as professor_name',
                'modules.id as module_id',
                'modules.name as module_name',
                'locations.id as location_id',
                'locations.name as location_name'
            )
            .from('slots')
            .innerJoin('blocks', 'blocks.id', 'block_id')
            .innerJoin('professors', 'professors.id', 'blocks.professor_id')
            .innerJoin('modules', 'modules.id', 'blocks.module_id')
            .leftJoin('locations', 'locations.id', 'location_id')
            .where({ board_id, 'slots.user_id': user_id })

        return res.json(slots)
    },

    // Create
    async create(req, res) {
        try {
            const { project_id } = req.params
            const { index, board_id, block_id } = req.body
            const { id: user_id } = req.user

            const [id] = await knex('slots').insert({
                project_id,
                index,
                board_id,
                block_id,
                user_id
            })

            return res.json({
                success: true,
                message: 'slot.create.ok',
                data: { id }
            })
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                success: false,
                message: 'slot.create.nok'
            })
        }
    },

    // Update
    async update(req, res) {
        const { index, board_id } = req.body
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('slots')
                .update({ index, board_id })
                .where({ id, project_id, board_id, user_id })

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'slot.update.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'slot.update.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'slot.update.err'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('slots')
                .where({ id, project_id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'slot.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'slot.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'slot.delete.err'
            })
        }
    }
}
