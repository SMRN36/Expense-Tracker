
const express = require("express");
const path = require("path");
const Expense = require("../models/expenseModel");

exports.getExpensesPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      console.log(expenses);
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postExpense = (req, res, next) => {
  const expAmt = req.body.expAmt;
  const expDesc = req.body.expDesc;
  const expCat = req.body.expCat;
  Expense.create({
    amount: expAmt,
    description: expDesc,
    category: expCat,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const id = req.query.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editExpense = (req, res, next) => {
  const id = req.query.id;
  const { amount, description, category } = JSON.parse(req.query.expenseItem);
  Expense.findByPk(id)
    .then((expense) => {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      return expense.save();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
