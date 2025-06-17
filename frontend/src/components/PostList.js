import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
  max-width: 700px;
  width: 100%;
`;

export default function PostList({ posts }) {
  if (!posts.length) return <div>No posts yet.</div>;
  return (
    <PostListWrapper>
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </PostListWrapper>
  );
} 