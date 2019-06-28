import React from 'react';
import styled from 'styled-components';

const IssueMassage = styled.div`
  font-size: ${({theme}) => theme.fontSize.l};
  color: ${({theme}) => theme.color.red};
  text-align: left;
  padding: 10px 0 10px 0;
`;

export default IssueMassage;