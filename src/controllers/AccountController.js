const knex = require('../database')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt')

// Controller
module.exports = {
    async register(req, res) {
        try {
            const { username, password } = req.body

            const user = await knex
                .select('id', 'role', 'password', 'name')
                .from('users')
                .where('username', username)
                .first()

            if (compareSync(password, user.password)) {
                // Generating token
                const token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: process.env.TOKEN_LIFE
                    }
                )

                const refresh_token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.REFRESH_SECRET
                )

                return res.json({
                    success: true,
                    message: 'user.registration.ok',
                    token,
                    refresh_token,
                    data: {
                        name: user.name
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: 'user.registration.nok'
                })
            }
        } catch (err) {
            // console.log(err)
            return res.status(400).json({
                success: false,
                message: 'user.registration.error'
            })
        }
    }
}
