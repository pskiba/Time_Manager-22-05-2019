import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import TaskItem from '../../molecules/taskItem/taskItem';
import ModuleName from '../../atoms/moduleName/moduleName';

import chooseTaskAct from '../../../_redux/actions/chooseTaskAct';
import updateTasksAct from '../../../_redux/actions/updateTasksAct';

const StyledWrapper = styled.div`

`;

const StyledListWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.color.black};
  padding: 10px 0 10px 0;
`;

const Legend = ({tasks, chooseTaskAct, updateTasksAct, dates, currentDate}) => {

  const selectTask = (_id) => {
    chooseTaskAct(_id);
  };

  const updateTaskColor = (data) => {
    let task = tasks.find((item) => item._id === data._id);
    task.color = data.color;
    updateTasksAct(task);
  };

  const getSelectedTasksId = () => {
    const dateObject = dates.find((item) => item.date === currentDate);
    if(dateObject) {
      const toDoIds = dateObject.toDo ? Object.keys(dateObject.toDo).map((key) => dateObject.toDo[key]) : [];
      const doneIds = dateObject.done ? Object.keys(dateObject.done).map((key) => dateObject.done[key]) : [];
      const ids = [...toDoIds, ...doneIds];
      const uniqueIds = [...new Set(ids)];
      return uniqueIds;
    }
    return [];
  };

  const tasksId = getSelectedTasksId();

  return (
    <StyledWrapper>
      <ModuleName>Legend</ModuleName>
      <StyledListWrapper>
        {
          tasks.map((item, index) => tasksId.indexOf(item._id) > -1 && <TaskItem key={index} task={item} type="legend" selectTask={selectTask} updateTaskColor={updateTaskColor}/>)
        }
      </StyledListWrapper>
    </StyledWrapper>
  )
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    dates: state.dates,
    currentDate: state.currentDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseTaskAct: (name) => chooseTaskAct(dispatch, name),
    updateTasksAct: (data) => updateTasksAct(dispatch, data)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Legend);