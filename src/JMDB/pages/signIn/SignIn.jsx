import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // yönlendirme için
import styles from './SignIn.module.css';
import { gql } from '@apollo/client';
import client from '../apolloClient';

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
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // yönlendirme hook'u

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await client.mutate({
                mutation: LOGIN_USER,
                variables: {
                    input: {
                        email,
                        pass,
                    },
                },
            });
            setResponse(result.data.login);
            setError('');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Giriş sırasında hata oluştu.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
                <h2>Sign in</h2>
                <div className={styles.overlayText}>JMDB</div>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={`${styles.btn} ${styles.btnSignin}`}>
                    Sign in
                </button>

                <button
                    type="button"
                    onClick={handleCreateAccount}
                    className={`${styles.btn} ${styles.btnCreate}`}
                >
                    Create a New Account
                </button>

                <div className={styles.forgot}>
                    <a href="#">Forgot your password?</a>
                </div>

                {error && <p style={{ color: 'red' }}>Eror: {error}</p>}
                {response && response.success && (
                    <p style={{ color: 'aquamarine' }}>
                        Signed In !
                    </p>
                )}
            </form>
        </div>
    );
};

export default SignIn;
