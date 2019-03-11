
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
        .createTable('topNine', function(tbl){
            tbl.increments('id');
            tbl.string('name')
                .notNullable();
            tbl.integer('ownerID')
                .references('id')
                .inTable('users')
                .notNullable();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('topNine');
};
