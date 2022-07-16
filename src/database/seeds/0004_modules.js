exports.seed = async function (knex) {
    if (await knex.select('id').from('modules').first()) {
        console.log('SEEDS: MODULES ...Aborted')
        return
    } else {
        console.log('SEEDS: MODULES')
    }

    // await knex('users').del()
    await knex('modules').insert([
        {
            project_id: 1,
            name: 'Module Example 1',
            short: 'Mod 1',
            code: 'M1',
            credits: 2,
            user_id: 1
        },
        {
            project_id: 1,
            name: 'Module Example 2',
            short: 'Mod 2',
            code: 'M2',
            credits: 2,
            user_id: 1
        }
    ])
}
