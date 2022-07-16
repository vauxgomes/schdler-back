exports.seed = async function (knex) {
    if (await knex.select('id').from('blocks').first()) {
        console.log('SEEDS: BLOCKS ...Aborted')
        return
    } else {
        console.log('SEEDS: BLOCKS')
    }

    // await knex('users').del()
    await knex('blocks').insert([
        {
            project_id: 1,
            professor_id: 1,
            module_id: 1,
            user_id: 1
        },
        {
            project_id: 1,
            professor_id: 2,
            module_id: 2,
            user_id: 1
        }
    ])
}
