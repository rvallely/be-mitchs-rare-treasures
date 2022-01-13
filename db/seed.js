const format = require("pg-format");
const db = require('./');

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
    // TESTING
    // .then((result) => {
    //   //console.log(result);
    //   return db.query(`
    //   SELECT * 
    //   FROM treasures;`)
    // })


    // 1. insert data into the shops table
    .then(() => {
      // TEST THE DATA - works
      console.log("shopData: ", shopData);
      
      const sql = format(`INSERT INTO shops (shop_name) VALUES %L;`, [
        ["a"],
        ["b"],
        // CONTINUE LOOKING AT LECTURE VID FROM 17-18 mins-ish
      ]);
      console.log(sql);

      // return db.query(`
      //   INSERT INTO shops
      //   (shop_name, owner, slogan)
      //   VALUES ($1, $2, $3);
      // `,
      //   shopData.map((shop) => shop.shop_name)
      // );


    })

    // 2. insert data into the treasures table
};

module.exports = seed;
