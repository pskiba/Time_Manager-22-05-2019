import React from 'react';
import styled from 'styled-components';

import TaskDescription from '../../atoms/taskDescription/taskDescription';
import ColorPicker from '../../atoms/colorSampler/colorSampler';
import FunctionButton from '../../atoms/functionButton/functionButton';

import PropTypes from "prop-types";

const TYPE_KEYS = {
  'all': ['addToPopular', 'edit'],
  'popular': ['removeFromPopular', 'edit'],
  'legend': ['edit']
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

const TaskItem = ({children, color, type, selectTask, updateTaskColor}) => {

  return (
    <StyledWrapper onClick={() => selectTask(children)}>
      <ColorPicker color={color} name={children} handlerChange={updateTaskColor}/>
      <TaskDescription>{children}</TaskDescription>
      <StyledButtonsWrapper>
        {
          TYPE_KEYS[type].map((item) => <FunctionButton type={item} name={children} key={item}/>)
        }
      </StyledButtonsWrapper>
    </StyledWrapper>
  )
};

TaskItem.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selectTask: PropTypes.func.isRequired,
  updateTaskColor: PropTypes.func.isRequired,
};

export default TaskItem;