import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PostList from '../components/PostList';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
`;
const Title = styled.h2`
  color: #273c75;
  margin-bottom: 1rem;
`;
const Section = styled.div`
  margin-bottom: 2rem;
`;
const Button = styled.button`
  background: #e84118;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #c23616; }
`;

export default function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${user.token}` } });
        const postsRes = await axios.get('/api/admin/posts', { headers: { Authorization: `Bearer ${user.token}` } });
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`/api/admin/posts/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (!user || user.role !== 'admin') return <Container><ErrorMessage>Admin access only.</ErrorMessage></Container>;

  return (
    <Container>
      <Title>Admin Panel</Title>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Section>
        <h3>Users</h3>
        <ul style={{listStyle: 'none', padding: 0}}>
          {users.map(u => (
            <li key={u._id} style={{borderBottom: '1px solid #f1f2f6', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{u.name} ({u.email}) - {u.role}</span>
              <Button onClick={() => handleDeleteUser(u._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h3>Posts</h3>
        {!loading && !error && <PostList posts={posts} />}
      </Section>
    </Container>
  );
} 