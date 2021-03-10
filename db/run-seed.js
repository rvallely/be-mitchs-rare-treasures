const data = require('./data/dev-data');
const seed = require('./seed');

const db = require('./');

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();
