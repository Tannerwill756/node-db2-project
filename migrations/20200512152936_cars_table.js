exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments();
    tbl.string("vin", 17).notNullable().unique();
    tbl.string("make", 128).notNullable();
    tbl.string("model", 128).notNullable();
    tbl.integer("mileage", 6).notNullable();

    tbl.string("transmission_type", 128);
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
