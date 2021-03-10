# Mitch's Rare Treasures

Mitch has gone into business!

After taking offence at a remark about his business acumen, he has charged headlong into establishing a network of antiques shops around the country. His jealous former colleagues have tried to follow him into the already crowded field, and now it's time for him to do a little market research. You have to help.

## 1. Database Setup

Mitch was planning to store all of his data in an Excel spreadsheet but you have informed him that this is a terrible idea. Convinced by your arguments, he made a start by creating the `shops` table for the database but needs your help to finish it off.

### a) Create the tables

Your first job will be to update the `createTables` function to create a `treasures` table.

You can find the `createTables` function in `./db/manage-tables.js`. Update it to also create a `treasures` table.

The `seed` script provided for you in the `package.json` will run the `seed` function (more on that later...) which in turn invokes the `createTables` function. Use `seed` script to check your `createTable` function is working as intended.

> **Hint**: Remember that you'll need create a `.env.development` file (use the `example.env` as a template) and then run the `setup.sql` file to create the databases first

#### Treasures

Each treasure should have a unique identifier and the following properties:

| Property        | Type                  | Required |
| --------------- | --------------------- | -------- |
| treasure_name   | string                | true     |
| colour          | string                | true     |
| age             | number                | true     |
| cost_at_auction | floating point number | true     |
| shop_id\*       | number                | true     |

\* shop_id should reference a shop in the shops table.

### b) Drop the tables

Once you have created the treasures table, you need to make sure that there is some way of deleting all of the treasure data for testing purposes. Update the `dropTables` function in `./db/manage-tables.js` appropriately.

## 2. Seeding

Mitch was going to enter this data by hand, but it was getting a little tiresome. Help him out by updating the **seed** function in `./db/seed.js` for the insertion of data into each table using `node-postgres`.

You will need to think about how to maintain relationships between the data before they are inserted into the db. In the database, treasures should reference the shop they belong to by the **shop_id**.

> When introducing new functionality into your seed file (or any file for that matter), it's important to remember to ask yourself: "Could I build this with TDD?". `node-postgres`, although it isn't our code, is a fully tested library. This means that we can use it and have a good degree of confidence in its effectiveness. If you need to add functionality to manipulate the data in any way, that's the time to start testing! Be sure that you build any seed utility functions you require using TDD.

## 3. Building Endpoints

It's essential that each endpoint is tested, including a test for each query! Avoid testing for too many things in one assertion.
It might be worth using a very small dataset (you can use the data in your `./db/data/test-data.js` file!).

Add error handling tests for each endpoint immediately after implementing the happy-path.

> **Hint:** Remember that if you're going to use a _test_ database, you'll now need a `.env.test` file to specify the name of the test database.

### **GET** `/api/treasures`

Create an endpoint to allow Mitch to view all the treasures currently available.

_responds with all treasures, including the shop name and details_

- each treasure should have the following keys:

  - treasure_id
  - treasure_name
  - colour
  - age
  - cost_at_auction
  - **shop_name**

- default sort criteria: age

  - `/api/treasures`, first result should be the youngest (default)
  - Allow a client to sort by `age`, `cost_at_auction` and `treasure_name` wth a `sort_by` query. `/api/treasures?sort_by=cost_at_auction`, for example, should respond with a list of treasures, cheapest firsts.

  If you have to use string interpolation here, make sure you validate the input to prevent **SQL INJECTION**.

> **Hint:** Some properties on the response might need to be coerced into numbers to check whether they are sorted correctly. Check out [the documentation for jest-sorted](https://www.npmjs.com/package/jest-sorted#user-content-tobesorted).

- default sort order: ascending

  - `/api/treasures`, first result should be the youngest (default)
  - `/api/treasures?order=desc`, for example, first result should be the oldest

- add the following queries:
  - colour e.g. `/api/treasures?colour=gold` responds with gold treasures only

### **POST** `/api/treasures`

You recently sorted through your attic and discovered some treasures of your own! As a good friend of Mitch, you entrust him with the sale of your precious items. Create an endpoint to add a new treasure.

_posts a new treasure to a shop_

- should post a new treasure to a given shop
- your new treasure should have the following keys
  - treasure_name
  - colour
  - age
  - cost_at_auction
  - shop_id (references an existing shop_id)

### **PATCH** `/api/treasures/:treasure_id`

The shop where Mitch has sent your treasures is having a sale. Create an endpoint to allow him to reduce the price of an item.

_updates a treasure in the database given a treasure id_

- should be able to update the price of a given treasure
- your patch request should contain the following information:
  - cost_at_auction

### **DELETE** `/api/treasures/:treasure_id`

Congratulations! Your item has been sold! Create an endpoint to delete your treasure from the database.

_deletes a treasure from the database given a treasure id_

- should be able to remove an existing treasure from the database, using the treasure_id

### **GET** `/api/shops`

Create an endpoint which allows Mitch to see all the shops in his network. He also needs to know how much capital is in each shop.

_responds with all shops_

- each shop object should have the following properties:
  - shop_id
  - shop_name
  - slogan
- add a **stock_value** key to each shop object (the total cost of treasures belonging to the shop). Think how you could do this in regular SQL first and then convert it to knex. Lessons 10 and 11 of this [tutorial](https://sqlbolt.com/lesson/select_queries_with_aggregates) could be useful when beginning to write your SQL query.

### **GET** `/api/treasures/` - more queries

Return to the GET `/api/treasures` endpoint and add the capability for clients to filter the results by age.

- add the following queries:
  - max_age
  - min_age

### Advanced

#### **GET** `/api/treasures`

It looks like Mitch has ended up with a looooad of treasure. It can be problematic to serve up unconstrained data sets over a REST API. A solution to this is to [paginate](https://medium.com/swlh/paginating-requests-in-apis-d4883d4c1c4c) the responses. Implement page-based pagination on the treasures endpoint!

Using the `LIMIT` and `OFFSET` [SQL clauses](https://www.postgresql.org/docs/current/queries-limit.html), allow clients to decide how many treasures they will receive information about, and which "page" they will see.

- add default limit of 5 per page - `/api/treasures` should send out 5 treasures by default
- accept a `limit` query which will override the default limit - `/api/treasures?limit=10`, for example, should send out a maximum of 10 treasures
- accept a `page` query which will respond with the selected "page" of treasures. For example, with the default limit of 5:
  - `/api/treasures?page=1` should respond with the first 5 treasures
  - `/api/treasures?page=2` should respond with treasures 6 to 10
  - `/api/treasures?page=5` should respond with treasures 21 to 25

**HINT: you might want to sort your treasures by treasure_name so that it is easier to check whether your pagination is working as intended**

#### **GET** `/api/shops`, add the following keys to each shop object:

- `treasure_count` specifying the number of treasures for that shop
- `stock_value` specifying the total value of all of their treasures
