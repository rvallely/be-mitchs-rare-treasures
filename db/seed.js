const format = require("pg-format");
const { formatShopData } = require("../utils/seed-formatting");
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
        shop_id INT REFERENCES shops(shop_id) NOT NULL
      );
    `)
    })

    // 1. insert data into the shops table
    .then(() => {

      // TEST: data
      console.log("shopData: ", shopData);  // works

      const formattedShops = formatShopData(shopData);
      
      const sql = format(
        `INSERT INTO shops (shop_name) VALUES %L RETURNING *;`,
        formattedShops
        );
        
        // TEST: sql
        console.log("SQL ---> ", sql);

        return db.query(sql);
    })

    // Upto here. See video around 5 mins: https://www.youtube.com/watch?v=nL7Y3VXBdh8 

    .then((result) => {
      console.log(result);
    });

};

module.exports = seed;
