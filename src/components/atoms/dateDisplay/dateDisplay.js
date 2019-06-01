import React from 'react';
import styled from 'styled-components';

const DateDisplay = styled.div`
  padding: 4px 0 4px 0;
  text-align: center;
  width: 180px;
  margin: 0 20px 0 20px;
  border: 1px solid ${({theme}) => theme.color.black};
  font-size: ${({theme}) => theme.fontSize.l};
`;

export default DateDisplay;
