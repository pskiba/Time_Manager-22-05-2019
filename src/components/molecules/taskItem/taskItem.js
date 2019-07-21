import React from 'react';
import styled from 'styled-components';

import TaskDescription from '../../atoms/taskDescription/taskDescription';
import ColorPicker from '../../atoms/colorSampler/colorSampler';
import FunctionButton from '../../atoms/buttons/functionButton';

import PropTypes from "prop-types";

const TYPE_KEYS = {
  'all': ['addToPopular', 'edit'],
  'popular': ['removeFromPopular', 'edit'],
  'legend': ['edit']
};

const TITLES = {
	'addToPopular': 'Add task to popular',
	'removeFromPopular': 'Remove task from popular',
	'edit': 'Open task'
};

const StyledWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 3px 10px 3px 10px;
  cursor: pointer;
  &:hover {
    background: ${({theme}) => theme.color.lightSteelBlue };
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
`;

const TaskItem = ({task, type, selectTask, updateTaskColor}) => {

  return (
    <StyledWrapper onClick={() => selectTask(task._id)}>
      <ColorPicker color={task.color} _id={task._id} handlerChange={updateTaskColor} title="Change color"/>
      <TaskDescription>{task.name}</TaskDescription>
      <StyledButtonsWrapper>
        {
          TYPE_KEYS[type].map((item) => <FunctionButton title={TITLES[item]} type={item} task={task} key={item}/>)
        }
      </StyledButtonsWrapper>
    </StyledWrapper>
  )
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  selectTask: PropTypes.func.isRequired,
  updateTaskColor: PropTypes.func.isRequired,
};

export default TaskItem;