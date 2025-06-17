import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(() => {
        setPosts([]);
      });
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-2 bg-gray-100">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-blue-900 mb-4 text-4xl text-center font-bold">Welcome to the dedev's Blog App</h1>
        <nav className="flex gap-4 mb-8 flex-wrap justify-center">
          <Link to="/login" className="text-blue-700 font-bold bg-white px-4 py-2 rounded shadow hover:bg-blue-700 hover:text-white transition">Login</Link>
          <Link to="/register" className="text-blue-700 font-bold bg-white px-4 py-2 rounded shadow hover:bg-blue-700 hover:text-white transition">Register</Link>
          <Link to="/posts" className="text-blue-700 font-bold bg-white px-4 py-2 rounded shadow hover:bg-blue-700 hover:text-white transition">Create Post</Link>
        </nav>
        <div className="w-full max-w-2xl mx-auto px-2">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
} 