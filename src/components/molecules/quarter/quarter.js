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

const Quarter = ({position, title, _id, color, type, updateQuarters}) => {
	
	const handleLeave = (e) => {
		e.preventDefault();
		if(e.buttons === 1) {
			updateQuarters({_id: _id, position: position, name: title})
		}
	};
	const handleClick = (e) => {
		
		updateQuarters({_id: _id, position: position, name: title})
		
	};
	
  if(type === 'transparent') {
    return <StyledWrapper color="none" zIndex={3} position={position} onMouseLeave={handleLeave} onClick={handleClick} />
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