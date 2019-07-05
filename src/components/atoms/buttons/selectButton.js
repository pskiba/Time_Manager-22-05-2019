import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectButton = styled.div`
  position: relative;
  width: 300px;
  padding: 3px 16px 3px 10px;
  height: 24px;
  cursor: pointer;
  background-color: ${({color}) => color};
  border: 1px solid ${({theme}) => theme.color.black};
  &::after {
    position: absolute;
    right: 5px;
    content: ' \\${({active}) => active ? '02C4' : '02C5'}';
  }
`;

SelectButton.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
};

export default SelectButton;
