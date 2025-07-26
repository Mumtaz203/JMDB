
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import client from '../../pages/apolloClient.js';

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

    const handleCreateUser = async () => {
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
        <div>
            <h2>Kullanıcı Oluştur</h2>
            <input
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Şifre"
                value={pass}
                type="password"
                onChange={(e) => setPass(e.target.value)}
            />
            <button onClick={handleCreateUser}>Oluştur</button>

            {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
            {response && (
                <p>
                    Oluşturuldu: {response.username} ({response.email})
                </p>
            )}
        </div>
    );
};

export default CreateUserForm;

