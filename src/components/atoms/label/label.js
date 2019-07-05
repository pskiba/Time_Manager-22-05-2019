import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: ${({theme}) => theme.fontSize.l};
  color: ${({color, theme}) => color ? color : theme.color.black};
  display: inline-block;
  padding: 5px 10px 5px 8px;
`;

Label.propTypes = {
  color: PropTypes.string
};

export default Label;