const knex = require('../database')

// Controller
module.exports = {
    // Index
    async index(req, res) {
        const { project_id } = req.params
        const { id: user_id } = req.user
        const projects = await knex
            .select('projects.name', 'projects.code')
            .from('related_projects')
            .innerJoin('projects', 'projects.id', 'related_id')
            .where({ 'related_projects.user_id': user_id, project_id })

        return res.json(projects)
    },

    // Create
    async create(req, res) {
        try {
            const { code } = req.body
            const { project_id } = req.params
            const { id: user_id } = req.user

            const relatedProject = await knex
                .select('id')
                .from('projects')
                .where({ code })
                .first()

            await knex('related_projects').insert({
                project_id,
                related_id: relatedProject.id,
                user_id
            })

            return res.json({
                success: true,
                message: 'relation.create.ok'
            })
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: 'relation.create.nok'
            })
        }
    },

    // Delete
    async delete(req, res) {
        const { project_id, code } = req.params
        const { id: user_id } = req.user

        try {
            const relatedProject = await knex
                .select('id')
                .from('projects')
                .where({ code })
                .first()

            const result = await knex('related_projects')
                .where({ project_id, related_id: relatedProject.id, user_id })
                .del()

            if (result)
                return res.status(200).send({
                    success: true,
                    msg: 'relation.delete.ok'
                })
            else
                return res.status(404).send({
                    success: false,
                    msg: 'relation.delete.nok'
                })
        } catch (err) {
            return res.status(404).send({
                success: false,
                msg: 'relation.delete.err'
            })
        }
    }
}
