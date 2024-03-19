import React, { useState } from 'react';
import { auth, database } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import Card from 'react-bootstrap/Card';

const CreateAccount = () => {
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const passwordPolicy = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/;

    const handleCreate = async () => {
        if (!passwordPolicy.test(password)) {
            setIsPasswordValid(false);
            return;
        } else {
            setIsPasswordValid(true);
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });

            const userRef = ref(database, `users/${userCredential.user.uid}`);
            await set(userRef, {
                name: name,
                email: email,
                balance: 100
            });

            setStatus('Account created successfully.');
            setShow(false);
        } catch (error) {
            setStatus(`Error creating account: ${error.message}`);
            setTimeout(() => setStatus(''), 8000);
        }
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
        setIsPasswordValid(true);
    };

    const isButtonDisabled = () => !name || !email || !password;

    return (
        <Card className='bg-secondary' style={{ width: '400px', marginLeft: '20px' }}>
            <Card.Body>
                {show ? (
                    <>
                        <Card.Title>Create Account</Card.Title>
                        <hr style={{ margin: '10px 0' }} />
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <input
                                type="checkbox"
                                onChange={togglePasswordVisibility}
                            /> Show Password
                        </div>
                        <div style={{ fontSize: '0.8rem', marginBottom: '10px', color: isPasswordValid ? 'inherit' : 'red' }}>
                            Password must be at least 8 characters, include at least one uppercase letter, one number, and one special character.
                        </div>
                        {status && <div style={{ color: 'red', marginBottom: '10px' }}>{status}</div>}
                        <button
                            className="btn btn-light"
                            onClick={handleCreate}
                            disabled={isButtonDisabled()}
                        >
                            Create Account
                        </button>
                    </>
                ) : (
                    <>
                        <Card.Title>Success</Card.Title>
                        <button
                            className="btn btn-light"
                            onClick={clearForm}
                        >
                            Add another account
                        </button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default CreateAccount;
