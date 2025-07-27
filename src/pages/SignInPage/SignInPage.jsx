import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { gql } from '@apollo/client';
import client from '../../apolloClient';

const LOGIN_USER = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            id
            success
        }
    }
`;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await client.mutate({
                mutation: LOGIN_USER,
                variables: { input: { email, pass } },
            });

            const loginData = result.data.login;

            if (loginData.success) {
                localStorage.setItem('username', email);
                navigate('/');
                setError('');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Giriş sırasında hata oluştu.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/createacc');
    };

    return (
        <div className="authPage">
            <div className="authContainer">
                <div className="authHeader">
                    <h2 className="title">Sign In</h2>
                </div>

                <form onSubmit={handleLogin} className="authForm">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="input"
                        required
                    />

                    <button type="submit" className="btn btnSignin">
                        Sign In
                    </button>
                    <div className="or-divider">or</div>
                    <button
                        type="button"
                        onClick={handleCreateAccount}
                        className="btn btnCreate"
                    >
                        Create a New Account
                    </button>

                    <div className="forgot">
                        <a href="#">Forgot your password?</a>
                    </div>

                    {error && <p className="error">Error: {error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
