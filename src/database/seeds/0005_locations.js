exports.seed = async function (knex) {
    if (await knex.select('id').from('locations').first()) {
        console.log('SEEDS: LOCATIONS ...Aborted')
        return
    } else {
        console.log('SEEDS: LOCATIONS')
    }

    // await knex('users').del()
    await knex('locations').insert([
        {
            project_id: 1,
            name: 'Location Example',
            short: 'Loc 1',
            code: 'L1',
            color: '#00BFFF',
            capacity: 30,
            user_id: 1
        }
    ])
}
