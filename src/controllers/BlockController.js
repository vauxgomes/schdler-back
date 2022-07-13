const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { project_id } = req.params
        const { id: user_id } = req.user
        const blocks = await knex
            .select(
                'blocks.id',
                'project_id',
                'professors.id as professor_id',
                'professors.name as professor_name',
                'modules.id as module_id',
                'modules.name as module_name',
                'credits'
            )
            .from('blocks')
            .innerJoin('professors', 'professors.id', 'blocks.professor_id')
            .innerJoin('modules', 'modules.id', 'blocks.module_id')
            .where({
                'blocks.project_id': project_id,
                'blocks.user_id': user_id
            })

        return res.json(blocks)
    },

    // Show
    async show(req, res) {
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        const block = await knex
            .select(
                'blocks.id',
                'project_id',
                'professors.id as professor_id',
                'professors.name as professor_name',
                'modules.id as module_id',
                'modules.name as module_name',
                'credits'
            )
            .from('blocks')
            .innerJoin('professors', 'professors.id', 'blocks.professor_id')
            .innerJoin('modules', 'modules.id', 'blocks.module_id')
            .where({
                'blocks.id': id,
                'blocks.project_id': project_id,
                'blocks.user_id': user_id
            })
            .first()

        console.log({
            'blocks.id': id,
            'blocks.project_id': project_id,
            'blocks.user_id': user_id
        })

        return res.json(block)
    },

    // Create
    async create(req, res) {
        try {
            const { professor_id, module_id } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const [id] = await knex('blocks').insert({
                project_id,
                professor_id,
                module_id,
                user_id
            })

            return res.json({
                success: true,
                message: 'block.create.ok',
                data: { id }
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'block.create.nok'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { project_id, id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('blocks')
                .where({ id, project_id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'block.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'block.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'block.delete.err'
            })
        }
    }
}
