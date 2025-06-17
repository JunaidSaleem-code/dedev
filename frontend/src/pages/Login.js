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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <Error>{error}</Error>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
} 