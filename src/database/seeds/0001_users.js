const { hashSync } = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const { roles } = require('../../middleware/authRoles')
const SALT = Number(process.env.SALT)

exports.seed = async function (knex) {
    if (await knex.select('id').from('users').first()) {
        console.log('SEEDS: USERS ...Aborted')
        return
    } else {
        console.log('SEEDS: USERS')
    }

    // await knex('users').del()
    await knex('users').insert([
        {
            name: 'Root',
            username: 'root',
            password: hashSync('root', SALT),
            role: roles.ROOT
        },
        {
            name: 'Admin',
            username: 'admin',
            password: hashSync('admin', SALT),
            role: roles.ADMIN
        }
    ])
}
