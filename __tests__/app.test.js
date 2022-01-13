const db = require("../db");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");

afterAll(() => db.end());

beforeEach(() => seed(testData));

describe("Our server", () => {
    test("Inserts data into the treasures table and returns an updated table", () => {
        // test goes here
    });
});