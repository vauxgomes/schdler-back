exports.seed = async function (knex) {
    if (await knex.select('id').from('timetables').first()) {
        console.log('SEEDS: TIMETABLES ...Aborted')
        return
    } else {
        console.log('SEEDS: TIMETABLES')
    }

    // await knex('users').del()
    await knex('timetables').insert([
        {
            project_id: 1,
            start: '07:00:00',
            end: '09:00:00',
            shift: 'morning',
            user_id: 1
        },
        {
            project_id: 1,
            start: '09:00:00',
            end: '11:00:00',
            shift: 'morning',
            user_id: 1
        },
        {
            project_id: 1,
            start: '13:00:00',
            end: '15:00:00',
            shift: 'afternoon',
            user_id: 1
        },
        {
            project_id: 1,
            start: '15:00:00',
            end: '17:00:00',
            shift: 'afternoon',
            user_id: 1
        },
        {
            project_id: 1,
            start: '18:00:00',
            end: '20:00:00',
            shift: 'night',
            user_id: 1
        },
        {
            project_id: 1,
            start: '20:00:00',
            end: '22:00:00',
            shift: 'night',
            user_id: 1
        }
    ])
}
