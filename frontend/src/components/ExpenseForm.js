// File: frontend/src/components/ExpenseForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/expenseSlice';

function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addExpense({ description, amount: parseFloat(amount), category }));

    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
            id="description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
            id="amount"
            type="number"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            type="submit"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;