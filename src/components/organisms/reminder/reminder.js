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

import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';
import updateDatesAct from '../../../_redux/actions/updateDatesAct';

const StyledNumberInput = styled(Input)`
  width: 50px;
  height: auto;
  padding: 2px;
  margin-right: 10px;
`;

const StyledCheckboxInput = styled(Input)`
  width: auto;
  height: auto;
`;

const StyledLightItalic = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.light};
  font-style: italic;
`;


class Reminder extends React.Component {

  state = {
    intervalReminder: (this.props.date && this.props.date.intervalValue !== 0),
    intervalValue: this.props.date && this.props.date.intervalValue ? this.props.date.intervalValue : 0,
    remindersList: this.props.date && this.props.date.remindersList ? this.props.date.remindersList : []
  };

  switchIntervalReminder = (e) => {
    this.setState({
      intervalReminder: e.target.checked
    })
  };

  setIntervalReminder = (e) => {
    this.setState({
      intervalValue: e.target.value
    })
  };

  removeSingleReminder = (id) => {
    this.setState({
      remindersList: this.state.remindersList.filter((item) => item.id !== id)
    })
  };

  addSingleReminder = () => {
    this.setState({
      remindersList: [...this.state.remindersList, {id: String(Math.random()), h: 0, min: 0}]
    })
  };

  setSingleReminder = (e) => {
    const idInfo = e.target.id.split('-');
    this.setState({
      remindersList: this.state.remindersList.map((item) => {
        return (idInfo[1] === item.id) ? {...item, [idInfo[0]]: Number(e.target.value)} : item
      })
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {date, currentDate, setModalStatusAct, updateDatesAct} = this.props;
    const {intervalReminder, intervalValue, remindersList} = this.state;
    const nitValue = intervalReminder ? intervalValue : 0;
    let data = {};

    if(!date) {
      data.dateItem = { 'date': currentDate, 'done': {}, 'toDo': {}, 'note': '', 'intervalValue': nitValue, 'remindersList': remindersList};
      data.isNew = true;
    } else {
      data.dateItem = {...date, 'intervalValue': nitValue, 'remindersList': remindersList};
    }

    updateDatesAct(data);
    // setModalStatusAct({type: 'NOTE', action: 'DISPLAY'});

  };

  render() {
    const { intervalReminder, intervalValue, remindersList} = this.state;
    const { currentDate, state } = this.props;
    return (
      <>
        <Row>
          <Heading>Reminder <StyledLightItalic>{currentDate}</StyledLightItalic></Heading>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Label htmlFor="switchInterval">Interval reminder</Label>
            <StyledCheckboxInput type="checkbox" id="switchInterval" checked={intervalReminder} onChange={this.switchIntervalReminder} />
          </Row>
          {
            intervalReminder && (
              <Row>
                <Label htmlFor="setInterval">Set interval</Label>
                <StyledNumberInput defaultValue={intervalValue} type="number" min="1" max="300" id="setInterval" onChange={this.setIntervalReminder} />
                <StyledLightItalic> min</StyledLightItalic>
              </Row>
            )
          }
          <Row>
            <Label htmlFor="note">Single reminder</Label>
            <QuantityButton onClick={this.addSingleReminder}>+</QuantityButton>

          </Row>
          {
            remindersList.map((item) => {
              return(
                <Row key={item.id}>
                  <Label htmlFor={'h-' + item.id}>h: </Label>
                  <StyledNumberInput defaultValue={item.h} type="number" min="0" max="23" id={'h-' + item.id} onChange={this.setSingleReminder} />
                  <Label htmlFor={'min-' + item.id}>min: </Label>
                  <StyledNumberInput defaultValue={item.min} type="number" min="0" max="59" id={'min-' + item.id} onChange={this.setSingleReminder} />
                  <QuantityButton onClick={() => this.removeSingleReminder(item.id)}>-</QuantityButton>
                </Row>
              )
            })
          }
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
    updateDatesAct: (data) => updateDatesAct(dispatch, data)
  }
};

const mapStateToProps = (state) => {
  return {
    date: state.dates.find((item) => item.date === state.currentDate),
    currentDate: state.currentDate
  }
};

Reminder.propTypes = {
  state: PropTypes.string.isRequired,
  setModalStatusAct: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);