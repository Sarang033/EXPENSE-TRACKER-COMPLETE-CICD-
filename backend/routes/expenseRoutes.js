
const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, updateExpense, deleteExpense, getTotalBalance,getExpensesByCategory,getExpensesOverTime} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getExpenses).post(protect, addExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);
router.get('/balance', protect, getTotalBalance);
router.get('/by-category', protect, getExpensesByCategory);
router.get('/over-time', protect, getExpensesOverTime);

module.exports = router;