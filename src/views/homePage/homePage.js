import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import TimeBar from '../../components/organisms/timeBar/timeBar';
import TasksSelector from '../../components/organisms/tasksSelector/tasksSelector';
import Button from '../../components/atoms/buttons/button';
import Modal from '../../components/organisms/modal/modal';
import TaskForm from '../../components/organisms/taskForm/taskForm';
import Note from '../../components/organisms/note/note';
import Reminder from '../../components/organisms/reminder/reminder';
import Legend from '../../components/organisms/legend/legend';
import DateBar from '../../components/organisms/dateBar/dateBar';

import setModalStatusAct from '../../_redux/actions/setModalStatusAct';

import {routes} from '../../routes';
import ToolTip from "../../components/molecules/toolTip/toolTip";

const StyledWrapper = styled.div`
  position: relative;
  width: 920px;
  margin: 0 auto;
`;

const StyledTimeBarWrapper = styled.div`
  margin: 20px 0 50px 0;
`;

const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0 0 0;
`;

const StyledSelectorsWrapper = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 70px;
`;

const HomePage = ({modalStatus, setModalStatusAct, loginStatus, toolTipSettings}) => {
	
  if(loginStatus !== 'log in') {
    return <Redirect to={routes.logIn}/>
  }

  const createTask = () => {
    setModalStatusAct({type: 'TASK', action: 'CREATE'});
  };

  const editNote = () => {
    setModalStatusAct({type: 'NOTE', action: 'DISPLAY'});
  };

  const editReminder = () => {
    setModalStatusAct({type: 'REMINDER', action: 'EDIT'});
  };

  return (
    <StyledWrapper>
			{toolTipSettings.on && <ToolTip {...toolTipSettings}/>}
      {
      	modalStatus &&
				<Modal>
					{modalStatus.type === 'TASK' && <TaskForm taskFormType={modalStatus.action}/>}
					{modalStatus.type === 'NOTE' && <Note state={modalStatus.action}/>}
					{modalStatus.type === 'REMINDER' && <Reminder state={modalStatus.action}/>}
				</Modal>
      }
      <StyledTopSection>
        <Button red={false} onClick={editNote}>Edit note</Button>
        <DateBar/>
        <Button red={false} onClick={editReminder}>Edit reminder</Button>
      </StyledTopSection>

      <StyledTimeBarWrapper>
        <TimeBar type="toDo"/>
        <TimeBar type="done"/>
      </StyledTimeBarWrapper>
			
      <StyledSelectorsWrapper>
        <TasksSelector type="all"/>
        <TasksSelector type="popular"/>
        <Button red={false} onClick={createTask}>Create task</Button>
      </StyledSelectorsWrapper>
      <Legend/>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus,
    loginStatus: state.loginStatus,
		toolTipSettings: state.toolTipSettings
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);