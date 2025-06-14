import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4078c0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;
const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
`;

export default function Loader({ text = 'Loading...' }) {
  return (
    <LoaderWrapper>
      <Spinner />
      <div style={{marginTop: '0.5rem', color: '#4078c0', fontWeight: 'bold'}}>{text}</div>
    </LoaderWrapper>
  );
} 