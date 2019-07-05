import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: -8px;
  left: ${({left}) => left -8}px;
  width: 20px;
  height: 40px;
  overflow: hidden;
`;

const StyledTriangle = styled.div`
  position: relative;
  left: 5px;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  top: ${({top}) => top}px;
  background: ${({theme}) => theme.color.black};
`;

const WatchTip = ({minute}) => {

  return (
    <StyledWrapper left={minute}>
      <StyledTriangle top={-5}/>
      <StyledTriangle top={5}/>
    </StyledWrapper>
  )
};

export default WatchTip;