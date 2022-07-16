exports.seed = async function (knex) {
    if (await knex.select('id').from('boards').first()) {
        console.log('SEEDS: BOARDS ...Aborted')
        return
    } else {
        console.log('SEEDS: BOARDS')
    }

    // await knex('users').del()
    await knex('boards').insert([
        {
            project_id: 1,
            name: 'Board Example 1',
            shift: 'morning',
            user_id: 1
        },
        {
            project_id: 1,
            name: 'Board Example 2',
            shift: 'afternoon',
            user_id: 1
        }
    ])
}
