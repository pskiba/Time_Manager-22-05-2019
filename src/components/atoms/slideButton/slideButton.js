import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButtonWrapper = styled.div`
  width: 20px;
  height: 37px;
  overflow: hidden;
  border-left: 2px solid ${({theme}) => theme.color.black};
  
  ${({left}) => left && css`
    transform: rotate(180deg);
  `}
`;

const StyledButton = styled.div`
  position: relative;
  left: -12px;
  top: 6px;
  width: 25px;
  height: 25px;
  border: 2px solid ${({theme}) => theme.color.black};
  transform: rotate(45deg);
`;

const SlideButton = ({left, callBack}) => {
  const value = left ? -1 : 1;
  return (
    <StyledButtonWrapper left={left} onClick={() => callBack(value)}>
      <StyledButton>

      </StyledButton>
    </StyledButtonWrapper>
  )
};

SlideButton.propTypes = {
  left: PropTypes.bool.isRequired,
  callBack: PropTypes.func.isRequired
};

export default SlideButton;