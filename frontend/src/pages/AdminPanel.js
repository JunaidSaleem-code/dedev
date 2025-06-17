import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PostList from '../components/PostList';

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

  if (!user || user.role !== 'admin') return <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8"><ErrorMessage>Admin access only.</ErrorMessage></div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-blue-900 mb-4 text-2xl font-bold">Admin Panel</h2>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <ul className="list-none p-0">
          {users.map(u => (
            <li
              key={u._id}
              className="border-b border-gray-100 py-4 flex justify-between items-center last:border-b-0"
            >
              <span>{u.name} ({u.email}) - {u.role}</span>
              <button
                onClick={() => handleDeleteUser(u._id)}
                className="bg-red-600 text-white border-none px-4 py-2 rounded font-bold hover:bg-red-800 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Posts</h3>
        {!loading && !error && <PostList posts={posts} />}
      </div>
    </div>
  );
} 