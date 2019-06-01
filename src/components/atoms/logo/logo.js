import React from 'react';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: ${({theme}) => theme.fontSize.xl};
  color: ${({theme}) => theme.color.white};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  padding: 3px 10px 3px 10px;
`;

export default Logo;
