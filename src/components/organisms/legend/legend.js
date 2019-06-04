import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import TaskItem from '../../molecules/taskItem/taskItem';
import ModuleName from '../../atoms/moduleName/moduleName';

import chooseTaskAct from '../../../_redux/actions/chooseTaskAct';
import updateTaskColorAct from '../../../_redux/actions/updateTaskColorAct';

const StyledWrapper = styled.div`

`;

const StyledListWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.color.black};
  padding: 10px 0 10px 0;
`;

const Legend = ({tasks, currentTaskName, chooseTaskAct, updateTaskColorAct}) => {

  const selectTask = (name) => {
    chooseTaskAct(name);
  };

  const updateTaskColor = (data) => {
    updateTaskColorAct(data)
  };

  return (
    <StyledWrapper>
      <ModuleName>Legend</ModuleName>
      <StyledListWrapper>
        {
          tasks.map((item, index) => <TaskItem key={index} color={item.color} type="legend" selectTask={selectTask} updateTaskColor={updateTaskColor}>{item.name}</TaskItem>)
        }
      </StyledListWrapper>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.filter((item) => {
        const date = item.date[state.currentDate];
        return date && (date.toDo || date.done);
      }),
    currentTaskName: state.currentTaskName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseTaskAct: (name) => chooseTaskAct(dispatch, name),
    updateTaskColorAct: (data) => updateTaskColorAct(dispatch, data)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Legend);