import React from 'react';

export default function PostForm({ title, content, onTitleChange, onContentChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 mb-8 bg-gray-50 p-6 rounded-lg w-full max-w-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Create a Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
        className="p-3 border border-gray-300 rounded text-base"
      />
      <textarea
        rows={3}
        placeholder="Content"
        value={content}
        onChange={onContentChange}
        className="p-3 border border-gray-300 rounded resize-vertical text-base"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white border-none px-6 py-2 rounded font-bold self-end text-base transition-colors duration-200 hover:bg-blue-900 disabled:opacity-60"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
      {error && (
        <div className="text-red-600 text-base mt-2 text-center">{error}</div>
      )}
    </form>
  );
} 