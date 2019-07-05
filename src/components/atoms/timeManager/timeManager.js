import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import timerAct from '../../../_redux/actions/timerAct';
import alarm1 from '../../../assets/alarm1.mp3';
import alarm2 from '../../../assets/alarm3.mp3';

const StyledWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
`;

const TimeManager = ({timerAct, date}) => {
  const audioRef1 = React.createRef();
  const audioRef2 = React.createRef();
  let lastMinute = 0;

  const setAlarm = (previousMinute, currentMinute) => {
    if(previousMinute !== currentMinute && date) {
      if(date && date.intervalValue && currentMinute % date.intervalValue === 0) {
        audioRef2.current.play();
      } else if(date && date.remindersList && date.remindersList.find((item) => item.h * 60 + item.min === currentMinute)) {
        audioRef1.current.play();
      }
    }
  };

  const loop = () => {
    const newDate = new Date();
    const minute = newDate.getHours() * 60 + newDate.getMinutes();
    setAlarm(lastMinute, minute);

    lastMinute = minute;
    timerAct(minute);
  };

  const interval = setInterval(loop, 10000);
  return (
    <StyledWrapper>
      <audio src={alarm1} ref={audioRef1} id="audio">audio</audio>
      <audio src={alarm2} ref={audioRef2} id="audio">audio</audio>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    date: state.dates.find((item) => item.date === state.actualDate),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    timerAct: (minutes) => timerAct(dispatch, minutes)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeManager);