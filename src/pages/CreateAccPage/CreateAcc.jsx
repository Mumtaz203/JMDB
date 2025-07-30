import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAcc.css';
import { gql } from '@apollo/client';
import client from '../../apolloClient';


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
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await client.mutate({
                mutation: CREATE_USER,
                variables: {
                    input: { username, email, pass },
                },
            });
            setError('');
            navigate('/signin');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Kayıt sırasında hata oluştu.');
        }
    };

    return (
        <div className="createPage">
            <div className="createContainer">
                {/* Gradient header ve logo */}
                <div className="createHeader">
                    <h2 className="title">Create Account</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleCreateUser} className="createForm">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                    />
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
                    <button type="submit" className="btn">
                        Create a New Account
                    </button>

                    <div className="forgot">
                        <a href="#">Forgot your password?</a>
                    </div>

                    {error && <p className="error">Hata: {error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;
