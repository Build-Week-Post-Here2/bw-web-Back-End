exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 255).notNullable().unique();
      tbl.string("password", 255).notNullable();
      tbl.string("email", 255).notNullable();
    })
    .createTable("posts", (tbl) => {
      tbl.increments();
      tbl.string("title", 255).notNullable();
      tbl.text("body");
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
