import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../store/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError && message) {
      console.error(message);
    }

    if (isSuccess && user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {message && (
          <div className={`p-4 mb-4 text-sm rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
  <div>
    <input
      type="email"
      className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
      id="email"
      name="email"
      value={email}
      placeholder="Enter your email"
      onChange={onChange}
      required
    />
  </div>
  <div>
    <input
      type="password"
      className="w-full rounded-lg border-gray-200 p-3 pe-12 text-base shadow-sm transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
      id="password"
      name="password"
      value={password}
      placeholder="Enter password"
      onChange={onChange}
      required
    />
  </div>
  <div className="flex justify-center">
    <button
      type="submit"
      className="rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
    >
      Login
    </button>
  </div>
</form>

      </div>
    </div>
  );
}

export default Login;
