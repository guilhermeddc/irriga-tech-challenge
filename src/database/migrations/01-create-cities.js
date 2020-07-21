exports.up = function (knex) {
  return knex.schema.createTable('cities', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('latitude').notNullable();
    table.string('longitude').notNullable();
    table.integer('gmt').notNullable();
  });
};

exports.down = function (Knex) {
  return Knex.schema.dropTable('cities');
};
