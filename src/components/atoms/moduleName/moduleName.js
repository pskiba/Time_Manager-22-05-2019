import React from 'react';
import styled from 'styled-components';

const ModuleName = styled.div`
  font-size: ${({theme}) => theme.fontSize.l};
  color: ${({theme}) => theme.color.black};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  padding: 5px 5px 5px 8px;
`;

export default ModuleName;