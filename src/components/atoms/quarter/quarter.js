import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WIDTH = 15;

const QuarterWrapper = styled.div`
  background: ${({color}) => color};
  opacity: 0.4;
  width: ${WIDTH}px;
  height: 22px;
  position: absolute;
  top: 1px;
  left: ${ ({position}) => WIDTH * position + 1}px;
`;

const Quarter = ({position, name, color, callBack}) => {
  return <QuarterWrapper color={color} position={position} onClick={() => callBack({position: position, name: name})}/>
};

Quarter.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired
};

export default Quarter;