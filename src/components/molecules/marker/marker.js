import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3;
`;

const StyledMarkedPlace = styled.div`
	background: ${({theme}) => theme.color.black};
	position: absolute;
	height: 24px;
	z-index: 3;
	opacity: 0.5;
	left: 0;
	top: 0;
	width: 0;
`;

const Marker = ({updateQuarters}) => {
	let refMarkedPlace = React.createRef();
	let markerNode;
	let parent;
	let left;
	let pX1 = 0;
	let pX2 = 0;
	let pStart = 0;
	let pEnd = 0;

	const markerOn = () => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const markerOff = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};
	
	const setStyle = (p1, p2) => {
		parent = markerNode.parentNode.parentNode;
		left = parent.getBoundingClientRect().left;
		pStart = Math.min(p1, p2) - left - 1;
		pStart = pStart - (pStart % 15);
		pEnd = Math.max(p1, p2) - left - 1;
		pEnd = pEnd - (pEnd % 15) + 15;
		markerNode.style.left = pStart + 'px';
		markerNode.style.width = ((pEnd - pStart) + 1) + 'px';
	};

	const handleMouseDown = (e) => {
		pX1 = e.pageX;
		pX2 = e.pageX;
		setStyle(pX1, pX2);
		markerOn();
	};

	const handleMouseUp = (e) => {
		markerOff();
		updateQuarters(pStart / 15, pEnd / 15);
		setStyle(0, 0);
	};

	const handleMouseMove = (e) => {
		pX2 = e.pageX;
		setStyle(pX1, pX2);
	};

	useEffect(() => {
		markerNode = refMarkedPlace.current;
		parent = markerNode.parentNode.parentNode;
		parent.addEventListener('mousedown', handleMouseDown);
		return () => {
			markerOff();
			parent.removeEventListener('mousedown', handleMouseDown);
		}
	}, []);
	
	return (
		<StyledWrapper >
			<StyledMarkedPlace ref={refMarkedPlace}/>
		</StyledWrapper>
	)
};

export default Marker;