exports.up = function (knex) {
    console.log('Migration: BLOCKS')

    return knex.schema.createTable('blocks', (table) => {
        table.increments('id').primary()

        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
        table
            .integer('professor_id')
            .notNullable()
            .references('professors.id')
            .onDelete('CASCADE')
        table
            .integer('module_id')
            .notNullable()
            .references('modules.id')
            .onDelete('CASCADE')
        table
            .integer('user_id')
            .notNullable()
            .references('users.id')
            .onDelete('CASCADE')

        table.unique(['project_id', 'professor_id', 'module_id'])

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('blocks')
}
