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
    .then((result) => {
      //console.log(result);
      return db.query(`
      SELECT * 
      FROM treasures;`)
      
    })
    .then((result) => {
      console.log(result);
    })
    // .then(() => {
    //   console.log(treasureData, '<<< treasureData');
    //   console.log(shopData, '<<< shopData')
    // })
    // .then(() => {
    //   console.log(db.query(`
    //   SELECT * 
    //   FROM treasures`));
    // });
};

module.exports = seed;
