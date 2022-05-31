exports.up = function (knex) {
    console.log('Migration: PROFESSORS')

    return knex.schema.createTable('professors', (table) => {
        table.increments('id').primary()

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
    return knex.schema.dropTable('professors')
}
