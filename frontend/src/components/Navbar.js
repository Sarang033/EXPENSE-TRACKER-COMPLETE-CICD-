import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
          Expense Tracker
        </Link>
        <ul className="flex space-x-6">
          {user ? (
            <li>
              <button
                className="text-white hover:text-red-400 transition duration-300 transform hover:scale-105"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white transition duration-300 transform hover:scale-105 hover:bg-gray-700 rounded-lg px-4 py-2 shadow-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white transition duration-300 transform hover:scale-105 hover:bg-gray-700 rounded-lg px-4 py-2 shadow-sm"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
