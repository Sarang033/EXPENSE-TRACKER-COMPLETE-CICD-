// File: frontend/src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, reset } from '../store/expenseSlice';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    dispatch(getExpenses());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user && user.username}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ExpenseForm />
          <ExpenseList expenses={expenses} />
        </div>
        <div>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;