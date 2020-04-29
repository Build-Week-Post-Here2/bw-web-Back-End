const knex = require("knex");

const knexConfig = require("../knexfile");
const dvEnv = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[dvEnv]);
