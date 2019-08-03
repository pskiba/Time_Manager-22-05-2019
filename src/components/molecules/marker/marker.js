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
	left: ${({pX1, pX2}) => pX1 < pX2 - 15 ? pX1 : pX2 - 15}px;
	top: 0;
	width: ${({pX1, pX2}) =>  pX1 < pX2 - 1 ? Math.abs(pX2 - pX1) : Math.abs(pX2 - pX1 - 31)}px;
`;

const Marker = ({updateQuarters}) => {
	let [pX1, setPX1] = useState(0);
	let [pX2, setPX2] = useState(0);
	let containerLeft = 0;
	let newMousePosition = 0;
	let oldMousePosition = 0;
	let timer;
	let refWrapper = React.createRef();
	let parent;
	let px1;
	let px2;
	
	const update = () => {
		let px = newMousePosition + 16 - (newMousePosition % 15);
		if(oldMousePosition !== px) {
			setPX2(px);
			oldMousePosition = px;
		}
	};

	const markerOn = () => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		timer = setInterval(update, 100);
	};

	const markerOff = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		clearInterval(timer);
	};

	const handleMouseDown = (e) => {
		containerLeft = parent.getBoundingClientRect().left;
		px1 = e.pageX - (e.pageX % 15) - containerLeft;
		px2 = e.pageX + 15 - (e.pageX % 15) - containerLeft;
		setPX1(px1);
		setPX2(px2);
		newMousePosition = px1;
		oldMousePosition = px1;
		markerOn();
	};

	const handleMouseUp = (e) => {
		markerOff();
		let pStart = px1 / 15;
		let qNumbers = (e.pageX - (e.pageX % 15) - containerLeft) / 15;
		setPX1(0);
		setPX2(0);
		
		updateQuarters(Math.min(pStart, qNumbers), Math.max(pStart, qNumbers));
	};

	const handleMouseMove = (e) => {
		newMousePosition = e.pageX - containerLeft;
	};

	useEffect(() => {
		parent = refWrapper.current.parentNode;
		parent.addEventListener('mousedown', handleMouseDown);
		return () => {
			markerOff();
			parent.removeEventListener('mousedown', handleMouseDown);
		}
	}, []);


	return (
		<StyledWrapper ref={refWrapper}>
			<StyledMarkedPlace pX1={pX1} pX2={pX2}/>
		</StyledWrapper>
	)
};

export default Marker;