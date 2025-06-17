import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #dcdde1;
  border-radius: 4px;
`;
const Button = styled.button`
  background: #4078c0;
  color: #fff;
  border: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #273c75; }
`;
const Error = styled.div`
  color: #e84118;
  font-size: 0.95rem;
`;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await axios.post('/api/users/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Error>{error}</Error>}
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
} 