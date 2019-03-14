
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
    .createTable('favorites', function(tbl){
        tbl.increments('id');
        tbl.integer('category')
            .references('category')
            .inTable('items')
            .notNullable();
        tbl.integer('user')
            .references('id')
            .inTable('users')
            .notNullable();
        tbl.integer('item')
            .references('id')
            .inTable('items')
            .notNullable();
        tbl.integer('position')
            .notNullable();
    })
    .createTable('items', function(tbl){
        tbl.increments('id');
        tbl.string('name')
            .unique()
            .notNullable();
        tbl.integer('category')
            .references('id')
            .inTable('categories')
            .notNullable();      
    })
    .createTable('categories', function(tbl){
        tbl.increments('id');
        tbl.string('cat_name')
            .unique()
            .notNullable();
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('favorites').dropTableIfExists('items').dropTableIfExists('categories');
};