import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useUser } from './userContext';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setStatus('Login successful.');
      setTimeout(() => {
        navigate('/'); // Redirect to Home
      }, 3000);
    } catch (error) {
      setStatus('Error: Invalid email or password.');
      setTimeout(() => setStatus(''), 3000);
    }
  };
  

  const isButtonDisabled = () => !email || !password;

  return (
    <Card className='bg-secondary' style={{ width: '400px', marginLeft: '20px' }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <hr style={{ margin: '10px 0' }} />
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
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
        {status && <div style={{ color: 'red' }}>{status}</div>}
        <button
          type="button"
          className="btn btn-light"
          onClick={handleLogin}
          disabled={isButtonDisabled()}
        >
          Login
        </button>
      </Card.Body>
    </Card>
  );
};

export default Login;
