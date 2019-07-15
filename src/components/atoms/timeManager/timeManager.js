import React from 'react';
import { connect } from 'react-redux';
import timerAct from '../../../_redux/actions/timerAct';


class TimeManager extends React.Component {
	
	lastMinute = 0;
	
	play = (data) => {
		const {voices} = this.props;
		let speechText = new SpeechSynthesisUtterance(data.message);
		speechText.voice = voices[data.voice];
		speechText.rate = 0.5;
		for(let i = 0; i < data.repeat; i++) {
			window.speechSynthesis.speak(speechText);
		}
		
	};
	
	setAlarm = (currentMinute) => {
		const {globalIntervalReminders, date} = this.props;
		if(globalIntervalReminders && date) {
			let globalIntervalReminder = globalIntervalReminders.length ? globalIntervalReminders.find((item) => (currentMinute + item.tStart) % item.gap === 0) : null;
			
			let reminders = date.reminders.length ? date.reminders.find((item) => currentMinute % ((item.hour * 60) + item.minute) === 0) : null;
			let intervalReminders = date.intervalReminders.length ? date.intervalReminders.find((item) => (currentMinute + item.tStart) % item.gap === 0) : null;
			globalIntervalReminder && this.play(globalIntervalReminder);
			reminders && this.play(reminders);
			intervalReminders && this.play(intervalReminders);
		}
	};
	
	loop = () => {
		const { timerAct } = this.props;
		const newDate = new Date();
		const minute = newDate.getHours() * 60 + newDate.getMinutes();
		if(this.lastMinute !== minute) {
			this.setAlarm(minute);
		}
		
		
		this.lastMinute = minute;
		timerAct(minute);
	};
	
	interval = setInterval(this.loop, 1000);
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return <></>
	}
}


const mapStateToProps = (state) => {
  return {
    date: state.dates.find((item) => item.date === state.actualDate),
		globalIntervalReminders: state.globalIntervalReminders,
		voices: state.voices,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    timerAct: (minutes) => timerAct(dispatch, minutes)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeManager);