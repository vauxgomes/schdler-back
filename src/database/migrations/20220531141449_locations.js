exports.up = function (knex) {
    console.log('Migration: LOCATIONS')

    return knex.schema.createTable('locations', (table) => {
        table.increments('id').primary()

        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')

        table.string('name', 100).notNullable()
        table.string('short', 20).notNullable()
        table.string('code', 20)
        table.string('color', 10).notNullable()
        table.integer('capacity').unsigned().defaultTo(0)

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
    return knex.schema.dropTable('locations')
}
