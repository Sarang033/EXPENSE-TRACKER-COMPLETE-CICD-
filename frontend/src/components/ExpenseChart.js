
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function ExpenseChart({ expenses }) {
  const pieData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find((item) => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const barData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    const existingDate = acc.find((item) => item.date === date);
    if (existingDate) {
      existingDate.amount += expense.amount;
    } else {
      acc.push({ date, amount: expense.amount });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>
      <p className="text-xl mb-4">Total Expenses: ₹ {totalExpenses.toFixed(2)}</p>
      {/* <p className="text-xl mb-4">Money Spent: ₹ {moneySpent.toFixed(2)}</p>  */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Expense Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Expenses Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;