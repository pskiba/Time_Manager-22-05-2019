import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import SlideButton from '../../atoms/slideButton/slideButton';
import DateDisplay from '../../atoms/dateDisplay/dateDisplay';

import changeDateAct from '../../../_redux/actions/changeDateAct';

const DAY_TO_MILLISECONDS = 86400000;

const Wrapper = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBar = ({currentDate, changeDateAct}) => {

  const changeDate = (value) => {
    const milliseconds = new Date(currentDate).getTime() + DAY_TO_MILLISECONDS * value;
    const newDate = new Date(milliseconds).toString().split(' ').splice(0, 4).join(' ');
    changeDateAct(newDate);
  };

  return (
    <Wrapper>
      <SlideButton left={true} callBack={changeDate}/>
      <DateDisplay>{currentDate}</DateDisplay>
      <SlideButton left={false} callBack={changeDate}/>
    </Wrapper>
  )
};

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
