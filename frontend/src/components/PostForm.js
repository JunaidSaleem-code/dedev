import React from 'react';
import styled from 'styled-components';

const PostFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
  background: #f8f9fa;
  padding: 1.5rem 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    max-width: 98vw;
  }
`;
const Input = styled.input`
  padding: 0.7rem;
  border: 1px solid #dcdde1;
  border-radius: 4px;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  padding: 0.7rem;
  border: 1px solid #dcdde1;
  border-radius: 4px;
  resize: vertical;
  font-size: 1rem;
`;
const Button = styled.button`
  background: #4078c0;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover { background: #273c75; }
`;
const Error = styled.div`
  color: #e84118;
  font-size: 0.98rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export default function PostForm({ title, content, onTitleChange, onContentChange, onSubmit, loading, error }) {
  return (
    <PostFormWrapper onSubmit={onSubmit}>
      <h3>Create a Post</h3>
      <Input type="text" placeholder="Title" value={title} onChange={onTitleChange} />
      <TextArea rows={3} placeholder="Content" value={content} onChange={onContentChange} />
      <Button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post'}</Button>
      {error && <Error>{error}</Error>}
    </PostFormWrapper>
  );
} 