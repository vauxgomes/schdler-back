const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { id: user_id } = req.user
        const { project_id } = req.params

        const modules = await knex
            .select('id', 'project_id', 'name', 'short', 'code', 'credits')
            .from('modules')
            .where({ project_id, user_id })
            .orderBy('name', 'asc')
            .orderBy('short', 'asc')

        return res.json(modules)
    },

    // Create
    async create(req, res) {
        try {
            const { name, short, code, credits } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const [id] = await knex('modules').insert({
                project_id,
                name,
                short,
                code,
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
        const { name, short, code, credits } = req.body
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('modules')
                .update({ name, short, code, credits })
                .where({ id, project_id, user_id })

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
        const { id, project_id } = req.params
        const { id: user_id } = req.user

        try {
            const result = await knex('modules')
                .where({ id, project_id, user_id })
                .del()

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
