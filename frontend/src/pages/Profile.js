import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PostList from '../components/PostList';

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

  if (!user) return <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8"><ErrorMessage>Please log in to view your profile.</ErrorMessage></div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-blue-900 mb-4 text-2xl font-bold">Profile</h2>
      <div className="mb-8">
        <div className="mb-8">
          <strong>Name:</strong> {user?.name}<br />
          <strong>Email:</strong> {user?.email}
        </div>
        <button
          className="bg-blue-700 text-white border-none px-4 py-2 rounded font-bold hover:bg-blue-900 transition mb-4"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
        >
          {showUpdateForm ? 'Hide Update Form' : 'Update Profile'}
        </button>
        {showUpdateForm && (
          <form onSubmit={handleUpdate} className="mb-6">
            <div className="mb-2">
              <label className="font-bold">Name:</label><br />
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300 mb-2"
              />
            </div>
            <div className="mb-2">
              <label className="font-bold">Email:</label><br />
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300 mb-2"
              />
            </div>
            <div className="mb-2">
              <label className="font-bold">New Password:</label><br />
              <input
                type="password"
                value={editPassword}
                onChange={e => setEditPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full p-2 rounded border border-gray-300 mb-2"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-blue-700 text-white border-none px-4 py-2 rounded font-bold hover:bg-blue-900 transition"
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white border-none px-4 py-2 rounded font-bold hover:bg-gray-700 transition"
              onClick={() => setShowUpdateForm(false)}
              disabled={updating}
            >
              Cancel
            </button>
            {updateMsg && <div className="text-green-600 mt-2">{updateMsg}</div>}
          </form>
        )}
        {error && <div className="text-red-600 text-base text-center mb-2">{error}</div>}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Posts</h3>
        {loading ? <Loader /> : <PostList posts={posts} />}
      </div>
    </div>
  );
} 