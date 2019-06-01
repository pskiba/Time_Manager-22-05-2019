import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background-color: ${({theme}) => theme.color.black};
  color: ${({theme}) => theme.color.white};
  padding: 4px 18px;
  border: 1px solid darkgray;
  border-radius: 3px;
  ${({ red }) => red && css`
    background-color: ${({theme}) => theme.color.red};
  `}
`;

export default Button;