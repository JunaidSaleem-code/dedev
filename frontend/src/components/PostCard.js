import React from 'react';

export default function PostCard({ post }) {
  return (
    <li className="bg-white rounded-lg mb-5 shadow-md p-6 flex flex-col gap-2 border-b border-gray-100 last:border-b-0">
      <div className="font-bold text-lg">{post.title}</div>
      <div className="mb-2">{post.content}</div>
      <div className="text-gray-400 text-sm self-end">By: {post.author?.name || 'Unknown'}</div>
    </li>
  );
} 