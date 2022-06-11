exports.up = function (knex) {
    console.log('Migration: PROJECTS')

    return knex.schema.createTable('projects', (table) => {
        table.increments('id').primary()

        table.string('code', 50).notNullable()
        table.string('name', 255).notNullable()
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
    return knex.schema.dropTable('projects')
}
