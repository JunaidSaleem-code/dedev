import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PostList from '../components/PostList';

const Container = styled.div`
  max-width: 600px;
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
const Info = styled.div`
  margin-bottom: 2rem;
`;
const Error = styled.div`
  color: #e84118;
  font-size: 0.95rem;
`;

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPassword, setEditPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/posts');
        setPosts(data.filter(post => post.author?._id === user._id));
      } catch (err) {
        setError('Failed to load your posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setDeleting(true);
    setError('');
    try {
      await axios.delete('/api/users/me', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    } catch (err) {
      setError('Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setUpdateMsg('');
    try {
      const { data } = await axios.put('/api/users/me', {
        name: editName,
        email: editEmail,
        password: editPassword || undefined,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      localStorage.setItem('userInfo', JSON.stringify({ ...user, name: data.name, email: data.email }));
      setUpdateMsg('Profile updated successfully');
      setEditPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (!user) return <Container><ErrorMessage>Please log in to view your profile.</ErrorMessage></Container>;

  return (
    <Container>
      <Title>Your Profile</Title>
      <Info>
        {!showUpdateForm ? (
          <>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <div style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem'}}>
              <button
                style={{background: '#4078c0', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => setShowUpdateForm(true)}
              >
                Update Profile
              </button>
              <button
                style={{background: '#e84118', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete My Account'}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} style={{marginBottom: '1.5rem'}}>
            <div style={{marginBottom: '0.5rem'}}>
              <label><strong>Name:</strong></label><br/>
              <input type="text" value={editName} onChange={e => setEditName(e.target.value)} required style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}} />
            </div>
            <div style={{marginBottom: '0.5rem'}}>
              <label><strong>Email:</strong></label><br/>
              <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} required style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}} />
            </div>
            <div style={{marginBottom: '0.5rem'}}>
              <label><strong>New Password:</strong></label><br/>
              <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} placeholder="Leave blank to keep current password" style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}} />
            </div>
            <button
              type="submit"
              style={{marginTop: '0.5rem', background: '#4078c0', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              style={{marginLeft: '0.5rem', background: '#888', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'}}
              onClick={() => setShowUpdateForm(false)}
              disabled={updating}
            >
              Cancel
            </button>
            {updateMsg && <div style={{color: 'green', marginTop: '0.5rem'}}>{updateMsg}</div>}
          </form>
        )}
      </Info>
      <Title>Your Posts</Title>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && <PostList posts={posts} />}
    </Container>
  );
} 