import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      localStorage.removeItem('userInfo');
      navigate('/login');
    } catch (err) {
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link className="text-white font-medium hover:underline" to="/">Home</Link>
        <Link className="text-white font-medium hover:underline" to="/posts">Create Post</Link>
        {user && user.role === 'admin' && (
          <Link className="text-white font-medium hover:underline" to="/admin">Admin Panel</Link>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <button
              onClick={() => navigate('/profile')}
              className="bg-transparent border-none cursor-pointer text-white font-bold mr-2 hover:underline"
            >
              {user.name}
            </button>
            <button
              onClick={handleLogout}
              className="bg-transparent border-none cursor-pointer text-white hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="text-white font-medium hover:underline" to="/login">Login</Link>
            <Link className="text-white font-medium hover:underline" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
} 