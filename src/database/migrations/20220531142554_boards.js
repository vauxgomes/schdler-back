exports.up = function (knex) {
    console.log('Migration: BOARDS')

    return knex.schema.createTable('boards', (table) => {
        table.increments('id').primary()

        table.integer('index').notNullable()
        table.integer('size').notNullable().defaultTo(10)
        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
        table
            .integer('block_id')
            .notNullable()
            .references('blocks.id')
            .onDelete('CASCADE')

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('boards')
}
