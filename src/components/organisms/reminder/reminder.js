import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../atoms/input/input';
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

const StyledNumberInput = styled(Input)`
  width: 50px;
  height: auto;
  padding: 2px;
  margin-right: 10px;
`;

const StyledContainer = styled.div`
	max-height: 152px;
	overflow: hidden;
	overflow-y: auto;
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

  handleSubmit = (e) => {
    e.preventDefault();
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

		
    // setModalStatusAct({type: 'NOTE', action: 'DISPLAY'});

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
          <StyledContainer>
						<Row>
							<Label htmlFor="note">One day interval reminder</Label>
							<QuantityButton onClick={this.addOneDayIntervalReminders}>+</QuantityButton>
							{
								oneDayIntervalReminders.map((item, index) => <ReminderItem type="interval" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeOneDayIntervalReminders} update={this.updateOneDayIntervalReminders}/>)
							}
						</Row>
					</StyledContainer>
					<StyledContainer>
						<Row>
							<Label htmlFor="note">Global interval reminder</Label>
							<QuantityButton onClick={this.addGlobalIntervalReminder}>+</QuantityButton>
							{
								globalIntervalReminders.map((item, index) => <ReminderItem type="interval" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeGlobalIntervalReminder} update={this.updateGlobalIntervalReminder} />)
							}
						</Row>
					</StyledContainer>
					<StyledContainer>
						<Row>
							<Label htmlFor="note">Single reminder</Label>
							<QuantityButton onClick={this.addSingleReminder}>+</QuantityButton>
							{
								reminders.map((item, index) => <ReminderItem type="single" {...item} voices={voices} key={String(Math.random() + index)} removeItem={this.removeSingleReminder} update={this.updateSingleReminder}/>)
							}
						</Row>
					</StyledContainer>
          <ActionRow>
            <Button red={false}>Save</Button>
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