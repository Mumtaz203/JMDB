import React, { useState } from 'react';
import styles from './CreateAcc.module.css';

const CreateAcc = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('You must agree to the Terms and Privacy Policy');
            return;
        }

        // Geçici log
        console.log({ email, password, name });
        // Buraya GraphQL mutation eklenecek
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.logo}>JMDB</h1>
                    <h2>Create a New Account</h2>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button type="submit">Create a New Account</button>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                        />
                        I agree to the Terms and Privacy Policy
                    </label>
                </form>
            </div>
        </div>
    );
};

export default CreateAcc;
