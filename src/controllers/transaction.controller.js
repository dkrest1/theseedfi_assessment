const pool = require("../configs/db.config");
const TransactionModel = require("../models/transaction.model");

async function createTransaction(req, res) {
  try {
    const { amount, description } = req.body;

    // validation of request body
    if (!amount || !description) {
      const response = {
        "message": "amount or description cannot be empty",
        data: null
      };
      res.statusCode = 400;
      res.end(JSON.stringify(response));
      return;
    }

    // check if amount is a number
    if (typeof amount !== 'number' || isNaN(amount)) {
      const response = {
        "message": "amount must be a number",
        data: null
      };
      res.statusCode = 400;
      res.end(JSON.stringify(response));
      return;
    }

    const newTransaction = await TransactionModel.create(pool, amount, description);
    const response = {
        "message": "Transaction created",
        data: newTransaction
    };
    res.statusCode = 201;
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error('Error creating transaction:', error);
    const response = {
        "message": "Error creating transaction",
        date: null
    }
    res.statusCode = 500;
    res.end(JSON.stringify(response))
  }
}

async function listTransactions(req, res) {

  try {
    const transactions = await TransactionModel.getAll(pool);
    const response = {
        "message": "Success",
        data: transactions
    };
    res.statusCode = 200;
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    const response = {
        "message": "Error retrieving transactions",
        date: null
    }
    res.statusCode = 500;
    res.end(JSON.stringify(response))
  }
}

module.exports = {
  createTransaction,
  listTransactions,
};
