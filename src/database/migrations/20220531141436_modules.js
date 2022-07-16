exports.up = function (knex) {
    console.log('Migration: MODULES')

    return knex.schema.createTable('modules', (table) => {
        table.increments('id').primary()

        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')

        table.string('name', 255).notNullable()
        table.string('short', 20).notNullable()
        table.string('code', 20).notNullable()
        table.integer('credits').unsigned().notNullable().defaultTo(1)

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
    return knex.schema.dropTable('modules')
}
