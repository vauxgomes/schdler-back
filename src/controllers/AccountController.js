const knex = require('../database')
const jwt = require('jsonwebtoken')

const { compareSync } = require('bcrypt')
const { TK_KEY, TK_EXP } = process.env

// Controller
module.exports = {
    async register(req, res) {
        try {
            const { username, password } = req.body

            const user = await knex
                .select('id', 'role', 'password')
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
                    TK_KEY,
                    {
                        expiresIn: TK_EXP
                    }
                )

                return res.json({
                    success: true,
                    token,
                    message: 'user.registration.ok'
                })
            } else {
                return res.json({
                    success: false,
                    message: 'user.registration.nok'
                })
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'user.registration.error'
            })
        }
    }
}
