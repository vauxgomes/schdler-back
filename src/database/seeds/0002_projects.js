const uuid = require('uuid')

exports.seed = async function (knex) {
    if (await knex.select('id').from('projects').first()) {
        console.log('SEEDS: PROJECTS ...Aborted')
        return
    } else {
        console.log('SEEDS: PROJECTS')
    }

    // await knex('users').del()
    await knex('projects').insert([
        {
            name: 'Project Example',
            code: uuid.v4(),
            user_id: 1
        }
    ])
}
