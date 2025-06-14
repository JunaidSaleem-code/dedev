import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../components/PostList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #f0f2f5;
`;
const Title = styled.h1`
  color: #273c75;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  text-align: center;
`;
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;
const StyledLink = styled(Link)`
  color: #4078c0;
  text-decoration: none;
  font-weight: bold;
  background: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s, color 0.2s;
  &:hover { background: #4078c0; color: #fff; text-decoration: none; }
`;
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
// Responsive styles
const ResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  @media (max-width: 900px) {
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    padding: 0 0.5rem;
    ${Title} { font-size: 2rem; }
    ${PostItem} { padding: 1rem 0.5rem; }
  }
`;

export default function Home() {
  // const [postCount, setPostCount] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        // setPostCount(data.length);
        setPosts(data);
      })
      .catch(() => {
        // setPostCount(null);
        setPosts([]);
      });
  }, []);
  return (
    <Container>
      <ResponsiveWrapper>
        <Title>Welcome to the MERN App</Title>
        <Nav>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
          <StyledLink to="/posts">Create Post</StyledLink>
        </Nav>
        <PostList posts={posts} />
      </ResponsiveWrapper>
    </Container>
  );
} 