import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  color: ${({theme}) => theme.color.black};
`;

export default Heading;

