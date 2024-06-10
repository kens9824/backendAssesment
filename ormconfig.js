const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/entity/**/*.js'],
  seeds: ['dist/seeds/**/*{.ts,.js}'],
  factories: ['dist/factories/**/*{.ts,.js}'],
  cache: {
    duration: 60000
  },

  synchronize: false,
  logging: true,
  ssl: false
};