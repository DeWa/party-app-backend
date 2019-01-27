exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', table => {
    table.bigIncrements('id').primary();
    table.string('code').notNullable();
    table.string('filename');
    table.string('path');
    table.boolean('uploaded').defaultTo(false);
    table.datetime('expires').notNullable();
    table.timestamps(true, true);
    table.unique('code');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
