const Project = require('../models/Project')
const Block = require('../models/Block')

module.exports = {
    // INDEX
    async index(request, response) {
        const user_id = request.headers.authorization
        const { project_id } = request.params

        const blocks = await Block.find({
            user: user_id,
            project: project_id
        }).populate([
            {
                path: 'professor',
                select: 'name'
            },
            {
                path: 'module',
                select: ['name', 'credits']
            },
            {
                path: 'location',
                select: ['name', 'capacity']
            }
        ])

        if (!blocks) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        return response.json(blocks)
    },

    // CREATE
    async create(request, response) {
        const user_id = request.headers.authorization
        const { project_id } = request.params

        const project = await Project.findOne({
            _id: project_id,
            user: user_id
        })

        if (!project) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const { professor, module, location } = request.body
        const block = await Block.create({
            user: user_id,
            project: project_id,
            professor,
            module,
            location
        })

        project.blocks.push(block)
        await project.save()

        return response.json({ _id: block._id })
    },

    // UPDATE
    async update(request, response) {
        const user_id = request.headers.authorization
        const { _id, project_id } = request.params

        const block = await Block.findOne({
            _id,
            user: user_id,
            project: project_id
        })

        if (!block) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const {
            professor = block.professor,
            module = block.module,
            location = block.location
        } = request.body

        try {
            await Block.updateOne({ _id }, { professor, module, location })
            return response.status(204).send()
        } catch (error) {
            return response.status(403).json({
                error: 'Not Allowed'
            })
        }

        return response.json({ _id: block._id })
    },

    // DELETE
    async delete(request, response) {
        const { _id, project_id } = request.params
        const user_id = request.headers.authorization

        const block = await Block.findOne({
            _id,
            user: user_id,
            project: project_id
        })

        if (!block) {
            return response.status(401).json({
                error: 'Not found / Not Allowed'
            })
        }

        const project = await Project.findOne({
            _id: project_id,
            user: user_id
        })

        project.blocks.splice(project.blocks.indexOf(_id), 1)
        
        await project.save()
        await Block.deleteOne({ _id })

        return response.status(204).send()
    }
}
