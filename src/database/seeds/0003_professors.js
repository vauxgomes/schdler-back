exports.seed = async function (knex) {
    if (await knex.select('id').from('professors').first()) {
        console.log('SEEDS: PROFESSORS ...Aborted')
        return
    } else {
        console.log('SEEDS: PROFESSORS')
    }

    // await knex('users').del()
    await knex('professors').insert([
        {
            project_id: 1,
            name: 'Professor Example 1',
            short: 'Prof 1',
            code: 'P1',
            color: '#63B8FF',
            user_id: 1
        },
        {
            project_id: 1,
            name: 'Professor Example 2',
            short: 'Prof 2',
            code: 'P2',
            color: '#6495ED',
            user_id: 1
        }
    ])
}
