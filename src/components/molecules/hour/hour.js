import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 24px;
  border: 1px solid ${({theme}) => theme.color.black};
`;

const Scale = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({position}) => position}px;
  width: 1px;
  height: 8px;
  background: ${({theme}) => theme.color.black};
`;

const TimeText = styled.span`
  font-size: ${({theme}) => theme.fontSize.m};
  color: ${({theme}) => theme.color.black};
  font-weight: ${({theme}) => theme.fontWeight.light};
  position: absolute;
  bottom: 7px;
  left: 6px;
`;

const Hour = ({children}) => {
  return (
    <StyledWrapper>
      <Scale position={15}/>
      <Scale position={30}/>
      <Scale position={45}/>
      <TimeText>{children}</TimeText>
    </StyledWrapper>
  )
};

Hour.propTypes = {
  children: PropTypes.string.isRequired
};

export default Hour;
