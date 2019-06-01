import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: ${({theme}) => theme.fontSize.l};
  color: ${({color}) => color};
`;

Label.propTypes = {
  color: PropTypes.string.isRequired
};

export default Label;