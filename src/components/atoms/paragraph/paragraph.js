import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({theme}) => theme.fontSize.l};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  color: ${({theme}) => theme.color.darkgray};
`;

export default Paragraph;