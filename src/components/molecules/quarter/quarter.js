import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TooltipContainer from '../tooltipContainer/tooltipContainer';

const WIDTH = 15;

const StyledWrapper = styled.div`
  background: ${({color}) => color};
  width: ${WIDTH}px;
  height: 22px;
  position: absolute;
  top: 1px;
  left: ${ ({position}) => WIDTH * position + 1}px;
  z-index: ${({zIndex}) => zIndex};
  
  & > div:first-child {
    display: none;
  }
  &:hover {
    background: ${({theme}) => theme.color.transparentBlack};
    
    div:first-child {
      display: block;
    }
  }
`;

const Quarter = ({position, color, type}) => {
	
  if(type === 'transparent') {
    return <StyledWrapper color="none" zIndex={4} position={position}  />
  } else {
    return <StyledWrapper color={color} zIndex={1} position={position} />
  }
};

Quarter.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default TooltipContainer(Quarter);