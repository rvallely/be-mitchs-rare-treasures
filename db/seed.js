const format = require('pg-format');
const db = require('./');
const { dropTables, createTables } = require('./manage-tables');

const seed = ({ shopData, treasureData }) => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      const insertShopsQueryStr = format(
        'INSERT INTO shops (shop_name, slogan) VALUES %L RETURNING *;',
        shopData.map(({ shop_name, slogan }) => [shop_name, slogan])
      );
      return db.query(insertShopsQueryStr);
    })
    .then(() => {
      // format then insert the treasures data into the treasures table
      // build any util functions with TDD!
    });
};

module.exports = seed;
