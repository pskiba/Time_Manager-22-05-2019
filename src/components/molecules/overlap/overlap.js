import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/buttons/button';
import { connect } from 'react-redux';

const TYPE_KEYS = {
	note: {
		text: 'Note',
		img: (active) => active ? 'notebookActive' : 'notebook',
		data:	['note']
	},
	reminder: {
		text: 'Reminder',
		img: (active) => active ? 'reminderActive' : 'reminder',
		data: ['intervalReminders', 'reminders']
	}
};

const StyledWrapper = styled.div`
	background-image: url(${({theme, img}) => theme.img[img]});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 80px;
	width: 200px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;



const Overlap = ({type, callBack, currentDateObj}) => {
	const active = TYPE_KEYS[type].data.filter((item) => {
		return currentDateObj && currentDateObj[item] && currentDateObj[item].length
	}).length > 0;
	return (
		<StyledWrapper img={TYPE_KEYS[type].img(active)}>
			<Button onClick={callBack}>{TYPE_KEYS[type].text}</Button>
		</StyledWrapper>
	)
};

const mapStateToProps = (state) => {
	return {
		currentDateObj: state.currentDateObj
	}
};

export default connect(mapStateToProps)(Overlap);