exports.up = function (knex) {
    console.log('Migration: BOARDS')

    return knex.schema.createTable('boards', (table) => {
        table.increments('id').primary()

        table.string('name', 255).notNullable()
        table.enu('period', ['D', 'M', 'V', 'N']).notNullable()
        table.integer('size').notNullable()
        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
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
    return knex.schema.dropTable('boards')
}
