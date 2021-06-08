const db = require('./');

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS shops;`)
    .then(() => {
      // drop any existing treasures table
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        slogan TEXT
      );`);
    })
    .then(() => {
      // continue from here...
    });
};

module.exports = seed;
