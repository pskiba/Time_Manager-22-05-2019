import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
	max-width: 80px;
	padding: 3px 2px 3px 2px;
	font-size: ${({theme}) => theme.fontSize.s};
`;

export default Select;