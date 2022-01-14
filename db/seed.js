const format = require("pg-format");
const { formatShopData, formatTreasureData, createShopRef } = require("../utils/seed-formatting");
const db = require("./");


const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query( `DROP TABLE IF EXISTS shops;`)
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        owner VARCHAR(100) NOT NULL,
        slogan VARCHAR(255)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE treasures (
        treasure_name VARCHAR(50) NOT NULL,
        colour VARCHAR(25) NOT NULL, 
        age INT NOT NULL,
        cost_at_auction FLOAT(2) NOT NULL,
        shop_id INT REFERENCES shops(shop_id) 
      );
    `)
    })
    .then(() => {
    
      const formattedShops = formatShopData(shopData);
      
      const sql = format(
        `INSERT INTO shops (shop_name, owner, slogan) VALUES %L RETURNING *;`,
        formattedShops
        );
        return db.query(sql);
    })
    .then((result) => { 
      //console.log(result.rows)
      const shopRef = createShopRef(result.rows);
      const formattedTreasures = formatTreasureData(treasureData, shopRef);
      
      const sql = format(
        `INSERT INTO treasures 
        (treasure_name, colour, age, cost_at_auction, shop_id) VALUES %L RETURNING *;`,
        formattedTreasures
        );
        return db.query(sql);

    })

};

module.exports = seed;
