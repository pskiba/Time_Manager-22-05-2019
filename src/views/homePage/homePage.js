import React from 'react';
import styled from 'styled-components';
import TimeBar from '../../components/organisms/timeBar/timeBar';
import TasksSelector from '../../components/organisms/tasksSelector/tasksSelector';
import Button from '../../components/atoms/button/button';
import Modal from '../../components/organisms/modal/modal';
import {connect} from 'react-redux';
import setModalStatusAct from '../../_redux/actions/setModalStatusAct';
import Legend from '../../components/organisms/legend/legend';
import DateBar from '../../components/organisms/dateBar/dateBar';

const StyledWrapper = styled.div`
  position: relative;
  width: 920px;
  margin: 0 auto;
`;

const StyledTimeBarWrapper = styled.div`
  margin: 20px 0 50px 0;
`;

const StyledSelectorsWrapper = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 70px;
`;

const HomePage = ({modalStatus, setModalStatusAct}) => {
  const handleClick = () => {
    setModalStatusAct('creat');
  };
  return (
    <StyledWrapper>
      {modalStatus !== 'closed' && <Modal/>}
      <DateBar/>
      <StyledTimeBarWrapper>
        <TimeBar type="toDo"/>
        <TimeBar type="done"/>
      </StyledTimeBarWrapper>
      <StyledSelectorsWrapper>
        <TasksSelector type="all"/>
        <TasksSelector type="popular"/>
        <Button red={false} onClick={handleClick}>Create task</Button>
      </StyledSelectorsWrapper>
      <Legend/>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);