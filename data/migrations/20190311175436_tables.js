
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', function(tbl){
        tbl.increments('id');
        tbl.string('username')
            .unique()
            // .onDelete('CASCADE')
            // .onUpdate('CASCADE')
            .notNullable();
        tbl.string('password')
            .notNullable();

    })
    .createTable('categories', function(tbl){
        tbl.increments('id');
        tbl.string('name')
            .unique()
            .notNullable();
    })
    .createTable('items', function(tbl){
        tbl.increments('id');
        tbl.string('name')
            .unique()
            .notNullable();
        tbl.integer('category_id')
            .references('id')
            .inTable('categories')
            .notNullable();      
    })
    .createTable('favorites', function(tbl){
        tbl.increments('id');
        tbl.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .notNullable();
        tbl.string('name')
            .notNullable();
        tbl.integer('position')
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('favorites').dropTableIfExists('items').dropTableIfExists("categories");
};
