import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TooltipContainer from '../../molecules/tooltipContainer/tooltipContainer';

const StyledColorSampler = styled.input.attrs({
  type: 'color',
  value: ({color}) => color,
})`
  margin: 3px 0 3px 0;
  width: 20px;
  height: 20px;
  background: ${({color}) => color};
  border: 1px solid ${({theme}) => theme.color.black};
`;

const ColorSampler = ({color, _id, handlerChange, ...props}) =>  {
  return <StyledColorSampler color={color} {...props} onChange={(e) => handlerChange({color: e.target.value, _id: _id})} />
};

ColorSampler.propTypes = {
  color: PropTypes.string.isRequired,
  _id: PropTypes.string,
  handlerChange: PropTypes.func.isRequired
};

export default TooltipContainer(ColorSampler);