exports.up = function (knex) {
  return knex.schema.createTable('temperatures', (table) => {
    table.increments('id').primary();
    table.decimal('temperature').notNullable();
    table.decimal('max_temperature').notNullable();
    table.decimal('min_temperature').notNullable();
    table.decimal('wind_speed').notNullable();
    table.bigInteger('sunrise').notNullable();
    table.bigInteger('sunset').notNullable();
    table.decimal('rain').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('city_id').unsigned();
    table.foreign('city_id').references('id').inTable('cities');
  });
};

exports.down = function (Knex) {
  return Knex.schema.dropTable('temperatures');
};
