
const Expense = require('../models/Expense');
const mongoose = require('mongoose')

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const newExpense = new Expense({
      user: req.user.id,
      description,
      amount,
      category
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Expense.findByIdAndDelete(expenseId); 

    res.json({ message: 'Expense removed', id: expenseId });
  } catch (error) {
    console.error('Error deleting expense:', error); 
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.getTotalBalance = async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user.id });
      const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      res.json({ total });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};

  exports.getExpensesByCategory = async (req, res) => {
    try {
      const expenses = await Expense.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
      ]);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };  
  exports.getExpensesOverTime = async (req, res) => {
    try {
      const expenses = await Expense.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, total: { $sum: '$amount' } } },
        { $sort: { '_id': 1 } }
      ]);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };