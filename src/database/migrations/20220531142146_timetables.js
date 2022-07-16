exports.up = function (knex) {
    console.log('Migration: TIMETABLES')

    return knex.schema.createTable('timetables', (table) => {
        table.increments('id').primary()

        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')

        table.time('start').notNullable()
        table.time('end').notNullable()
        table
            .enu('shift', ['morning', 'afternoon', 'night', 'daytime'])
            .notNullable()

        table
            .integer('user_id')
            .notNullable()
            .references('users.id')
            .onDelete('CASCADE')

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('timetables')
}
