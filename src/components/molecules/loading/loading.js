import React from 'react';
import styled from 'styled-components';
import LoadingGif from '../../../assets/giphy.gif';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.2);
`;

const Loading = () => {
  return (
    <StyledWrapper>
      <img src={LoadingGif} alt="loading"/>
    </StyledWrapper>
  )
};

export default Loading;

