const { DB_URL } = process.env;

const knexConfig = {
  development: {
    client: 'pg',
    connection: DB_URL,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'pg',
    connection: DB_URL,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'pg',
    connection: `postgres://postgres:postgres@localhost:4322/test`,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/test',
    },
  },
};

module.exports = knexConfig;
