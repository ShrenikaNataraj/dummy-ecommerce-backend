require('dotenv').config();

module.exports = {
  dev: {
    username: 'postgres',
    password: 'Shrenika@123',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'sequelize_tutorial',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'sequelize_tutorial',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
