import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { storeTokenInCookie } from '../../Utilities/CookieUtility';
import { useDispatch } from "react-redux";
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm();
    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister }, watch } = useForm();
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitLogin = async (data) => {
        try {
            console.log(data);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data);
            const { token, user } = response.data;
            storeTokenInCookie(token);
            dispatch(login({ user }));
            navigate("/");
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to login. Please check your credentials and try again.');
        }
    };

    const onSubmitRegister = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data);
            console.log(response.data); // Log response for registration success
            setIsRegister(false); // Automatically switch to login after registration
        } catch (error) {
            console.error('Error registering:', error);
            alert('Failed to register. Please try again.');
        }
    };

    const password = watch("password", "");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {isRegister ? (
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register To Solemate</h2>
                    <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input 
                                type="text" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerRegister('username', { required: 'Username is required' })} 
                            />
                            {errorsRegister.username && <p className="text-red-500 text-sm mt-1">{errorsRegister.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input 
                                type="text" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerRegister('email', { required: 'Email is required' })} 
                            />
                            {errorsRegister.email && <p className="text-red-500 text-sm mt-1">{errorsRegister.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input 
                                type="password" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerRegister('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
                            />
                            {errorsRegister.password && <p className="text-red-500 text-sm mt-1">{errorsRegister.password.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input 
                                type="password" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerRegister('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || 'The passwords do not match' })} 
                            />
                            {errorsRegister.confirmPassword && <p className="text-red-500 text-sm mt-1">{errorsRegister.confirmPassword.message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300">Register</button>
                        <button 
                            type="button" 
                            className="w-full mt-4 text-blue-500 hover:underline"
                            onClick={() => setIsRegister(false)}
                        >
                            Login
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login To Solemate</h2>
                    <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input 
                                type="text" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerLogin('username', { required: 'Username is required' })} 
                            />
                            {errorsLogin.username && <p className="text-red-500 text-sm mt-1">{errorsLogin.username.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Password</label>
                            <input 
                                type="password" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                {...registerLogin('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
                            />
                            {errorsLogin.password && <p className="text-red-500 text-sm mt-1">{errorsLogin.password.message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300">Login</button>
                        <button 
                            type="button" 
                            className="w-full mt-4 text-blue-500 hover:underline"
                            onClick={() => setIsRegister(true)}
                        >
                            Register
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
