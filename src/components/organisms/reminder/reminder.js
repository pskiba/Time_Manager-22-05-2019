import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Row from '../../atoms/row/row';
import ActionRow from '../../atoms/actionRow/actionRow';
import Button from '../../atoms/buttons/button';
import Label from '../../atoms/label/label';
import Heading from '../../atoms/heading/heading';
import QuantityButton from '../../atoms/buttons/quantityButton';
import ReminderItem from '../reminderItem/reminderItem';

import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';
import updateDatesAct from '../../../_redux/actions/updateDatesAct';
import setGlobalReminder from '../../../_redux/actions/setGlobalReminder';


const StyledContainer = styled.div`
	max-height: 102px;
	overflow: hidden;
	overflow-y: auto;
	border: 1px solid ${({theme}) => theme.color.black};
`;

const StyledLightItalic = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.light};
  font-style: italic;
`;


class Reminder extends React.Component {

  state = {
    reminders: this.props.date && this.props.date.reminders ? this.props.date.reminders : [],
		oneDayIntervalReminders: this.props.date && this.props.date.intervalReminders ? this.props.date.intervalReminders : [],
		globalIntervalReminders: this.props.globalIntervalReminders
  };

  removeSingleReminder = (id) => {
    this.setState({
      reminders: this.state.reminders.filter((item) => item.id !== id)
    })
  };
	
	removeGlobalIntervalReminder = (id) => {
		this.setState({
			globalIntervalReminders: this.state.globalIntervalReminders.filter((item) => item.id !== id)
		});
	};
	
	removeOneDayIntervalReminders = (id) => {
		this.setState({
			oneDayIntervalReminders: this.state.oneDayIntervalReminders.filter((item) => item.id !== id)
		});
	};

  addSingleReminder = () => {
    this.setState({
      reminders: [{id: String(Math.random()), hour: 20, minute: 20, voice: 1, repeat: 2, message: 'message' }, ...this.state.reminders]
    })
  };
	
	addGlobalIntervalReminder = () => {
		this.setState({
			globalIntervalReminders: [{id: String(Math.random()), tStart: 1, gap: 1, voice: 1, repeat: 2, message: 'message' }, ...this.state.globalIntervalReminders]
		});
	};
	
	addOneDayIntervalReminders = () => {
		this.setState({
			oneDayIntervalReminders: [{id: String(Math.random()), tStart: 1, gap: 1, voice: 1, repeat: 2, message: 'message' }, ...this.state.oneDayIntervalReminders]
		});
	};
	
	updateGlobalIntervalReminder = (data) => {
		
		this.setState({
			globalIntervalReminders: this.state.globalIntervalReminders.map((item) => {
				return item.id === data.id ? data : item;
			})
		});
	};
	
	updateOneDayIntervalReminders = (data) => {
		this.setState({
			oneDayIntervalReminders: this.state.oneDayIntervalReminders.map((item) => {
				return item.id === data.id ? data : item;
			})
		});
	};

  updateSingleReminder = (data) => {
    this.setState({
      reminders: this.state.reminders.map((item) => {
				return item.id === data.id ?  data : item;
      })
    })
  };
  
  saveReminderSettings = () => {
		const {date, currentDate, setModalStatusAct, updateDatesAct, setGlobalReminder} = this.props;
		const {reminders, oneDayIntervalReminders, globalIntervalReminders} = this.state;
		let data = {};
	
		if(!date) {
			data.dateItem = { 'date': currentDate, 'done': {}, 'toDo': {}, 'note': '', 'intervalReminders': oneDayIntervalReminders, 'reminders': reminders};
			data.isNew = true;
		} else {
			data.dateItem = {...date, 'intervalReminders': oneDayIntervalReminders, 'reminders': reminders};
		}
	
		updateDatesAct(data);
		setGlobalReminder(globalIntervalReminders);
		setModalStatusAct({type: 'REMINDER', action: 'DISPLAY'});
	};
  
  editReminder = () => {
		const {setModalStatusAct} = this.props;
		setModalStatusAct({type: 'REMINDER', action: 'EDIT'});
	};

  handleSubmit = (e) => {
    e.preventDefault();
		const {state} = this.props;
		if(state === 'EDIT') {
			this.saveReminderSettings();
		} else {
			this.editReminder();
		}
  };

  render() {
    const { reminders, globalIntervalReminders, oneDayIntervalReminders} = this.state;
    const { currentDate, state, voices} = this.props;
    return (
      <>
        <Row>
          <Heading>Reminder <StyledLightItalic>{currentDate}</StyledLightItalic></Heading>
        </Row>
        <form onSubmit={this.handleSubmit}>
					<Row>
						<Label htmlFor="note">One day interval reminder</Label>
						<QuantityButton disabled={state !== 'EDIT'} onClick={this.addOneDayIntervalReminders}>+</QuantityButton>
					</Row>
					{
						oneDayIntervalReminders.length > 0 &&
						<StyledContainer>
							{
								oneDayIntervalReminders.map((item, index) => <ReminderItem disabled={state !== 'EDIT'} type="interval" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeOneDayIntervalReminders} update={this.updateOneDayIntervalReminders}/>)
							}
						</StyledContainer>
					}
					<Row>
						<Label htmlFor="note">Global interval reminder</Label>
						<QuantityButton disabled={state !== 'EDIT'} onClick={this.addGlobalIntervalReminder}>+</QuantityButton>
					</Row>
					{
						globalIntervalReminders.length  > 0  &&
						<StyledContainer>
							{
								globalIntervalReminders.map((item, index) => <ReminderItem disabled={state !== 'EDIT'} type="interval" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeGlobalIntervalReminder} update={this.updateGlobalIntervalReminder} />)
							}
						</StyledContainer>
					}
					<Row>
						<Label htmlFor="note">Single reminder</Label>
						<QuantityButton onClick={this.addSingleReminder} disabled={state !== 'EDIT'}>+</QuantityButton>
					</Row>
					{
						StyledContainer.length > 0  &&
						<StyledContainer>
							{
								reminders.map((item, index) => <ReminderItem disabled={state !== 'EDIT'} type="single" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeSingleReminder} update={this.updateSingleReminder}/>)
							}
						</StyledContainer>
					}
          <ActionRow>
            <Button red={false}>{state === 'EDIT' ? 'Save' : 'Edit' }</Button>
          </ActionRow>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status),
    updateDatesAct: (data) => updateDatesAct(dispatch, data),
		setGlobalReminder: (data) => setGlobalReminder(dispatch, data)
  }
};

const mapStateToProps = (state) => {
  return {
		voices: state.voices,
    date: state.dates.find((item) => item.date === state.currentDate),
    currentDate: state.currentDate,
		globalIntervalReminders: state.globalIntervalReminders
  }
};

Reminder.propTypes = {
  state: PropTypes.string.isRequired,
  setModalStatusAct: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);