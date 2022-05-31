const { hashSync } = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const { roles } = require('../../middleware/authRoles')
const ENC_SALT = Number(process.env.ENC_SALT)

exports.seed = async function (knex) {
    console.log('SEEDS: USERS')

    if (await knex.select('id').from('users').first()) {
        console.log(' - ABORTED: Table has already being populated')
        return
    }

    // await knex('users').del()
    await knex('users').insert([
        {
            name: 'Root',
            username: 'root',
            password: hashSync('root', ENC_SALT),
            role: roles.ROOT
        },
        {
            name: 'Admin',
            username: 'admin',
            password: hashSync('admin', ENC_SALT),
            role: roles.ADMIN
        }
    ])
}
