exports.up = function (knex) {
    console.log('Migration: RELATED PROJECTS')

    return knex.schema.createTable('related_projects', (table) => {
        table
            .integer('project_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
        table
            .integer('related_id')
            .notNullable()
            .references('projects.id')
            .onDelete('CASCADE')
        table
            .integer('user_id')
            .notNullable()
            .references('users.id')
            .onDelete('CASCADE') // Who created the relation

        table.unique(['project_id', 'related_id'])
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('related_projects')
}
