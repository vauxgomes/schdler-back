exports.up = function (knex) {
    console.log('Migration: SLOTS')

    return knex.schema.createTable('slots', (table) => {
        table.increments('id').primary()

        table.integer('index').notNullable()
        table
            .integer('board_id')
            .notNullable()
            .references('boards.id')
            .onDelete('CASCADE')
        table
            .integer('block_id')
            .notNullable()
            .references('blocks.id')
            .onDelete('CASCADE')
        table
            .integer('user_id')
            .notNullable()
            .references('users.id')
            .onDelete('CASCADE')

        table.integer('location_id').references('locations.id')

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('slots')
}
