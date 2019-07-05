import React from 'react';
import styled from "styled-components";

const QuantityButton = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 15px;
  text-align: center;
  line-height: 13px;
  background: ${({theme}) => theme.color.darkgray};
  border: 1px solid ${({theme}) => theme.color.black};
  color: ${({theme}) => theme.color.white};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: ${({theme}) => theme.fontSize.m};
  transition: all 0.4s;
  &:hover {
    background: ${({theme}) => theme.color.black};
  }
`;

export default QuantityButton;