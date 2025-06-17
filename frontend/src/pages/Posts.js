import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

axios.defaults.baseURL = 'http://localhost:5000';

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
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col items-center mt-8 mb-8">
      <h2 className="text-blue-900 mb-6 text-2xl text-center font-bold">Posts</h2>
      <PostForm
        title={title}
        content={content}
        onTitleChange={e => setTitle(e.target.value)}
        onContentChange={e => setContent(e.target.value)}
        onSubmit={handleCreate}
        loading={creating}
        error={error}
      />
      {loading ? (
        <Loader />
      ) : (
        <ul className="list-none p-0 w-full">
          {posts.map(post => (
            <li key={post._id} className="border-b border-gray-100 py-4 last:border-b-0">
              <div className="font-bold text-lg">{post.title}</div>
              <div className="mb-2">{post.content}</div>
              <div className="text-gray-400 text-sm">By: {post.author?.name || 'Unknown'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

