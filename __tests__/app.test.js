// NOTE: amended this file during Paul's lecture, Fri 14 Jan AM

// include supertest if required...
// const request = require("supertest"); 

const db = require("../db");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");
const { request } = require("express");
const { app } = require("faker/lib/locales/en");

afterAll(() => db.end());

// added 'return' to beforeEach, as per set up in lecture...
beforeEach(() => { 
    return seed(testData) 
});

describe("Our server", () => {
    test.only("Inserts data into the treasures table and returns an updated table", () => {
        // test logic goes here - see Paul's walkthrough video from Thursday afternoon
    });
});

// --------------------------- COPIED THESE TEST EXAMPLES------------------------------ //
// Paul also added a view-db.sql file in root directory and ran 'psql -f view-db.sql > view-db.txt' in command line

// TEST 1 TO UPDATE: copied from Paul's lecture - needs changing to suit our project
// see models and controllers setup in video

describe("GET /api/films", () => {
    test("200 (ok): responds with an array of films", () => {
        
        return request(app)
            .get("api/films")
            .expect(200)
            .then((res) => {
                expect(res.body.films).toBeInstanceOf(Array);
                expect(res.body.films).toHaveLength(4);

                res.body.films.forEach((film) => {
                    expect(film).toMatchObject({
                        film_id: expect.any(Number),
                        film_title: expect.any(String),
                        year_of_release: expect.any(Number)
                        // remaining columns go here - use our table data .....  
                    });
                });
            });
    });
});


// TEST 2 TO UPDATE
// see models and controllers setup in video

test("200 (ok): films sorted by year of release by default", () => {
    
    return request(app)
        .get("api/films")
        .expect(200)
        .then((res) => {
            // LOGIC SUGGESTIONS FROM LECTURE
            // check they're in the right order
            // loop through, and check each entry is >= to the one before
            // res.body.films === [...].sort((a, b) => {})

            // instead of the above, we'll use 'jest-sorted' package (by Paul)  
            // see install instructions: https://www.npmjs.com/package/jest-sorted
            expect(res.body.films).toBeSortedBy("year_of_release");
        });
});


// TEST 3 TO UPDATE
// see models and controllers setup in video

test("200 (ok): films sorted by a passed query", () => {
    
    return request(app)
        .get("api/films?sort_by=film_id")
        .expect(200)
        .then((res) => {
             expect(res.body.films).toBeSortedBy("film_id");
        });
});

// TEST 4 TO UPDATE
// see models and controllers setup in video

test("400 (bad request): for invalid sort_by column", () => {
    
    return request(app)
        .get("api/films?sort_by=not_a_column_name")
        .expect(400)
        .then((res) => {
             expect(res.body.msg).toBe("bad request");
        });
});


