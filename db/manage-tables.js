const db = require('./');

const createTables = () => {
  return db.query(`
  CREATE TABLE shops (
    shop_id SERIAL PRIMARY KEY,
    shop_name VARCHAR(255) NOT NULL,
    slogan TEXT
  );`);
};

const dropTables = () => {
  return db.query(`DROP TABLE IF EXISTS shops;`);
};

module.exports = { createTables, dropTables };
