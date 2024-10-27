
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
          <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;