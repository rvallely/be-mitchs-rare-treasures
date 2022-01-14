const format = require("pg-format");
const { formatShopData, formatTreasureData, createShopRef } = require("../utils/seed-formatting");
const db = require("./");


const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      // drop any existing shops table
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
        treasure_id SERIAL PRIMARY KEY,
        treasure_name VARCHAR(50) NOT NULL,
        colour VARCHAR(25) NOT NULL, 
        cost_at_auction FLOAT(2) NOT NULL,
        shop_id INT REFERENCES shops(shop_id) 
      );
    `)
    })

    // 1. insert data into the shops table
    .then(() => {

      // TEST: data
      //console.log("shopData: ", shopData);  // works
      //sql = format('INSERT INTO t (name, age) VALUES %L', myNestedArray); 
      //console.log(sql); // INSERT INTO t (name, age) VALUES ('a', '1'), ('b', '2')
      const formattedShops = formatShopData(shopData);
      
      const sql = format(
        `INSERT INTO shops (shop_name, owner, slogan) VALUES %L RETURNING *;`,
        formattedShops
        );
        
        // TEST: sql
        //console.log("SQL ---> ", sql);

        return db.query(sql);
    })
    .then((result) => { 
      //console.log("result.rows ---->", result.rows);
      // console.log(createShopRef, "<<< createShopRef")
      // const shopRef = createShopRef(result.rows);
      const formattedTreasures = formatTreasureData(treasureData);
      
      const sql = format(
        `INSERT INTO treasures 
        (treasure_name, colour, cost_at_auction) VALUES %L RETURNING *;`,
        formattedTreasures
        );
        return db.query(sql);

    })

};

module.exports = seed;
