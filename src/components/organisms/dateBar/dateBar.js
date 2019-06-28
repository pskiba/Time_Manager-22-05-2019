import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import SlideButton from '../../atoms/slideButton/slideButton';
import DateDisplay from '../../atoms/dateDisplay/dateDisplay';
import Calendar from '../../organisms/calendar/calendar';

import changeDateAct from '../../../_redux/actions/changeDateAct';

const DAY_TO_MILLISECONDS = 86400000;

const Wrapper = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


class DateBar extends React.Component {

  state = {
    calendarIsOn: false
  };
  dateDisplayRef = React.createRef();

  changeDate = (value) => {
    const {currentDate, changeDateAct} = this.props;
    const milliseconds = new Date(currentDate).getTime() + DAY_TO_MILLISECONDS * value;
    const newDate = new Date(milliseconds).toString().split(' ').splice(0, 4).join(' ');

    changeDateAct(newDate);
  };

  chooseDay = (date) => {
    const {changeDateAct} = this.props;
    const newDate = new Date(date).toString().split(' ').splice(0, 4).join(' ');
    console.log(newDate);
    changeDateAct(newDate);
  };

  calendarOn = () => {
    this.setState({
      calendarIsOn: true
    });
  };

  calendarOff = () => {
    this.setState({
      calendarIsOn: false
    });
  };

  render() {
    const {currentDate} = this.props;
    const {calendarIsOn} = this.state;
    return (
      <Wrapper>
        {calendarIsOn && <Calendar calendarOff={this.calendarOff} chooseDay={this.chooseDay}/>}
        <SlideButton left={true} callBack={this.changeDate}/>
        <DateDisplay ref={this.dateDisplayRef} onClick={this.calendarOn} indexOf>{currentDate}</DateDisplay>
        <SlideButton left={false} callBack={this.changeDate}/>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentDate: state.currentDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDateAct: (date) => changeDateAct(dispatch, date)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DateBar);
