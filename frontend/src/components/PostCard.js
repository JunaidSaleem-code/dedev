import React from 'react';
import styled from 'styled-components';

const PostItem = styled.li`
  border-bottom: 1px solid #f1f2f6;
  padding: 1.5rem 1.2rem;
  &:last-child { border-bottom: none; }
  background: #fff;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Author = styled.div`
  color: #718093;
  font-size: 0.95rem;
  align-self: flex-end;
`;

export default function PostCard({ post }) {
  return (
    <PostItem>
      <div style={{fontWeight:'bold',fontSize:'1.15rem'}}>{post.title}</div>
      <div style={{marginBottom:'0.5rem'}}>{post.content}</div>
      <Author>By: {post.author?.name || 'Unknown'}</Author>
    </PostItem>
  );
} 