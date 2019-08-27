import React, { useEffect } from 'react';
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
  cursor: pointer;
  left: -12px;
  top: 6px;
  width: 25px;
  height: 25px;
  border: 2px solid ${({theme}) => theme.color.black};
  transform: rotate(45deg);
  &:hover {
    background: ${({theme}) => theme.color.transparentBlack};
  }
  &:active {
    background: ${({theme}) => theme.color.black};
  }
`;

const SlideButton = ({left, callBack}) => {
	let interval = null;
	let timer = null;
	const value = left ? -1 : 1;
	
	const buttonOn = () => {
		callBack(value);
		timer = setTimeout(() => {
			interval = setInterval(() => {
				callBack(value);
			}, 120);
		},250);
		
	};
	
	const buttonOff = () => {
		clearInterval(interval);
		clearTimeout(timer);
	};
	
	useEffect(() => {
		document.addEventListener('mouseup', buttonOff);
		return () => {
			document.removeEventListener('mouseup', buttonOff);
			buttonOff();
		}
	});
  
  return (
    <StyledButtonWrapper left={left} onMouseDown={buttonOn} >
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