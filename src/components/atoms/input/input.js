import React from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs({
  type: ({type}) => type,
  id: ({id}) => id
})`
  width: ${({small}) => small ? 'auto': '100%'};
  padding: 4px 10px 4px 10px;
  color: ${({theme}) => theme.color.black};
`;

export default Input;