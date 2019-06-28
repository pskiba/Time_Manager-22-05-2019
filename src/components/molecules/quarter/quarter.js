import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ToolTip from '../toolTip/toolTip';

const WIDTH = 15;

const QuarterWrapper = styled.div`
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

const Quarter = ({position, name, description, _id, color, type, handleClick}) => {
  if(type === 'transparent') {
    return (
      <QuarterWrapper  color="none" zIndex={3} position={position} onClick={() => handleClick({_id: _id, position: position, name: name})}>
        {_id && <ToolTip task={{title: name, description: description }}/>}
      </QuarterWrapper>
    )
  } else {
    return <QuarterWrapper color={color} zIndex={1} position={position} />
  }
};

Quarter.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default Quarter;