import React, { useState } from 'react';
import styles from './CreateAcc.module.css';
import { gql } from '@apollo/client';
import client from '@/JMDB/pages/apolloClient.js';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            username
            email
        }
    }
`;

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await client.mutate({
                mutation: CREATE_USER,
                variables: {
                    input: {
                        username,
                        email,
                        pass,
                    },
                },
            });
            setResponse(result.data.createUser);
            setError('');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Hata oluştu');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
                <h2>Create Account</h2>
                <div className={styles.overlayText}>JMDB</div>
            </div>
            <form onSubmit={handleCreateUser} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    required
                />
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
                <button type="submit" className={`${styles.btn} ${styles.btnCreateAcc}`}>
                    Create a New Account
                </button>

                <div className={styles.forgot}>
                    <a href="#">Forgot your password?</a>
                </div>
                {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
                {response && (
                    <p>
                        Created User: {response.username} ({response.email})
                    </p>
                )}
            </form>
        </div>
    );
};

export default CreateUserForm;
