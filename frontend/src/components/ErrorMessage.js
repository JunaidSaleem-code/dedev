import React from 'react';
import styled from 'styled-components';

const ErrorDiv = styled.div`
  color: #e84118;
  background: #fff0f0;
  border: 1px solid #e84118;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  margin: 1rem 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
`;

export default function ErrorMessage({ children }) {
  if (!children) return null;
  return <ErrorDiv>{children}</ErrorDiv>;
} 