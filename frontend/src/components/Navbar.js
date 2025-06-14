import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #273c75;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  &:hover { text-decoration: underline; }
`;
const UserInfo = styled.span`
  margin-right: 1rem;
  font-weight: 500;
`;

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <Nav>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/posts">Create Post</StyledLink>
        {user && user.role === 'admin' && <StyledLink to="/admin">Admin Panel</StyledLink>}
      </NavLinks>
      <NavLinks>
        {user ? (
          <>
            <StyledLink as="button" onClick={() => navigate('/profile')} style={{background:'none',border:'none',cursor:'pointer',color:'#fff',fontWeight:'bold'}}>
              {user.name}
            </StyledLink>
            <StyledLink as="button" onClick={handleLogout} style={{background:'none',border:'none',cursor:'pointer',color:'#fff'}}>Logout</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
} 