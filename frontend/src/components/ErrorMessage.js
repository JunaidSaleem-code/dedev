import React from 'react';

export default function ErrorMessage({ children }) {
  if (!children) return null;
  return (
    <div className="text-red-600 bg-red-50 border border-red-600 rounded-md px-5 py-3 my-4 text-center text-base font-medium">
      {children}
    </div>
  );
} 