import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

axios.defaults.baseURL = 'http://localhost:5000';

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem;
    margin: 1rem 0.2rem;
  }
`;
const Title = styled.h2`
  color: #273c75;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
`;
const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;
const PostItem = styled.li`
  border-bottom: 1px solid #f1f2f6;
  padding: 1rem 0;
  &:last-child { border-bottom: none; }
`;
const Author = styled.div`
  color: #718093;
  font-size: 0.95rem;
`;
const Error = styled.div`
  color: #e84118;
  font-size: 0.98rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      window.location.href = '/login';
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/api/posts/', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPosts(data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Redirect to login on 401 Unauthorized
        window.location.href = '/login';
      } else {
        setError('Failed to load posts');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    setCreating(true);
    setError('');
    try {
      await axios.post('/api/posts/', { title, content }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTitle('');
      setContent('');
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // window.location.href = '/login';
        console.log(err);
      } else {
        setError(err.response?.data?.message || 'Failed to create post');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/posts/${editingPostId}`, {
        title: editTitle,
        content: editContent
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEditingPostId(null);
      setEditTitle('');
      setEditContent('');
      fetchPosts();
    } catch (err) {
      setError('Failed to update post');
    }
  };

  return (
    <Container>
      <Title>Create Post</Title>
      {user && (
        <PostForm
          title={title}
          content={content}
          onTitleChange={e => setTitle(e.target.value)}
          onContentChange={e => setContent(e.target.value)}
          onSubmit={handleCreate}
          loading={creating}
          error={error}
        />
      )}
    </Container>
  );
}

