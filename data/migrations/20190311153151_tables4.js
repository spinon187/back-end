
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
        tbl.string('category')
            .notNullable();
        tbl.integer('user')
            .references('id')
            .inTable('users')
            .notNullable();
        
    })
    .createTable('items', function(tbl){
        tbl.increments('id');
        tbl.string('name')
            .notNullable();
        tbl.string('category')
            .notNullable();
        tbl.string('users');        
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('favorites').dropTableIfExists('items');
};
