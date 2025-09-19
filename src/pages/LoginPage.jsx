import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://new-bckend-safalfasal.onrender.com/api/v1/users/login', { email, password });
            console.log("Login successfull")
            localStorage.setItem('token', response.data.accessToken);
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('YOUR_HOSTED_BACKEND_URL/api/v1/users/register', { email, password, name: 'Default Name' });
            const response = await axios.post('YOUR_HOSTED_BACKEND_URL/api/v1/users/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            navigate('/profile');
        } catch (err) {
            setError('Failed to signup. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="max-w-sm w-full p-7 rounded-2xl shadow-xl bg-white">
                <h1 className="text-3xl font-extrabold text-green-700 mb-3 text-center">Safal Fasal AI</h1>
                <p className="mb-4 text-gray-500 text-center">Login or Signup to continue</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form>
                    <input
                        className="border p-2 rounded w-full mb-3"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded w-full mb-3"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 mb-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleSignup}
                        className="w-full py-2 rounded bg-green-500 hover:bg-green-700 text-white font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;