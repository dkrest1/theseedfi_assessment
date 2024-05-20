# THESEEDFI ASSESSMENT 

## Description

This task demonstrate saving a numerical value (currency) with controlled precision 
to a PostgreSQL database using Node.js without data loss. This example will utilize native functionalities
and avoid external frameworks like Express and ORM Libraries like TypeORM.</p>

## Research and Explanation to the Question Asked in The Interview

**Answer:** To save a floating-point value with 4 decimal places, such as 2053.0005, 
in a PostgreSQL database without losing precision 

**Recommended Approach: Using `NUMERIC`, `DECIMAL` or `STRING` Data Types** 

For financial applications or scenarios where precision is paramount, the preferred data types are `NUMERIC` and `DECIMAL`. These types offer:

- **Exact Storage:** They represent numbers precisely, avoiding rounding errors that can occur with floating-point data types.
- **Scalability:** They support a configurable number of decimal places, allowing you to tailor precision to your specific needs.

**Example Usage:**

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount NUMERIC(10, 4) NOT NULL -- 10 total digits (including potential sign), 4 decimal places
);
```
**Alternative** we can also handle it as a `string`, it's main by preference, this also prevent value from rounding up.

## Features

- **Create a Transaction:** Endpoint to create a transaction.
- **Get Transactions:** Endpoint to get Transactions.

## Prerequisites

- Node.js (20.x)
- PostgreSQL 
- pg package `npm i pg`

## Folder Structure

    theseedfi_currency_transaction_tracker/
    │
    ├── config/
    │ └── db-migration.config.js.js # Migrations script for monitoring of database
    | └── db-config.js # Used for creating new `PostgreSQl` connection
    │
    ├── migrations/ # migration files
    │
    ├── models/ #  models
    │ └── transaction.model.js # Transactions model
    │
    ├── controllers/ # Controllers for handling requests
    │ └── transaction.controller.js
    │
    ├── routes/ # Route definitions
    │ └── transaction.route.js.js
    │
    ├── .env # Environment variables
    ├── index.js # Entry point of the application
    ├── package.json # NPM package file
    └── README.md # Project README

## Getting Started

1. Clone the repository:

```bash
$ git clone repo url
$ cd theseedfi_currency_transaction_tracker
```

2. Create a `.env`file and put in the right credentials:

```bash
cp .env.example .env
source .env
```
**PS:** ensure you fill your .env file before starting the server

3. Start the Server
  
```bash
$ npm install 
$ npm run dev
```

## APIs Documentation

### Base URL

The base URL for the API is: `http://localhost:3000`

### Endpoints

#### Create Transaction

**Endpoint:** `/transactions`

**Method:** `POST`

**Description:** This endpoint allows you to create a new transaction.

**Request Body:**

| Field         | Type   | Description                      |
|---------------|--------|----------------------------------|
| `amount`      | number | The amount for the transaction   |
| `description` | string | A description for the transaction|

**Response:**

**Success (201 Created):**

```json
{
  "message" : "Transaction created",
  "data": {
    "id": 1,
    "amount": 100.0000,
    "description": "Sample transaction",
  }
}
```

##### Example Usage
```bash
$ curl -X POST http://localhost:3000/transactions \
     -H "Content-Type: application/json" \
     -d '{
           "amount": 100.00,
           "description": "Sample transaction"
        }'
```

#### Get all Transactions

**Endpoint:** `/transactions`

**Method:** `GET`

**Description:** This endpoint get all transactions.

**Request Body:**


**Response:**

**Success (200 Success):**

```json
{
  "message" : "Success",
  "data": [
    {
        "id": 1,
        "amount": 100.0000,
        "description": "Sample transaction",
    },
    {
        "id": 2,
        "amount": 200.0000,
        "description": "Another transaction",
    }
  ]
}
```

##### Example Usage
```bash
$ curl -X GET http://localhost:3000/transactions
```