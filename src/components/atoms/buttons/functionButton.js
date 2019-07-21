import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TooltipContainer from '../../molecules/tooltipContainer/tooltipContainer';

import CheckMarkIcon from '../../../assets/checkmarkIcon.svg';
import EditIconIcon from '../../../assets/editIcon.svg';
import TrashIcon from '../../../assets/trashIcon.svg';

import updateTasksAct from '../../../_redux/actions/updateTasksAct';
import editTaskAct from '../../../_redux/actions/editTaskAct';
import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';

const TYPE_KEYS = {
  'addToPopular': {
    icon: CheckMarkIcon,
    action: 'updateTasksAct',
    getData: (task) => ({...task, popular: true})
  },
  'edit': {
    icon: EditIconIcon,
    action: 'editTaskAct',
    getData: (task) => {
      return {id: task._id, modalStatus: {type: 'TASK', action: 'DISPLAY'}}
    }
  },
  'removeFromPopular': {
    icon: TrashIcon,
    action: 'updateTasksAct',
    getData: (task) => ({...task, popular: false})
  },
};

const StyledFunctionButton = styled.div`
  width: 26px;
  height: 26px;
  background-image: url(${({ type }) => TYPE_KEYS[type].icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60%;
  
  &:hover {
    background-color: ${({theme}) => theme.color.steelBlue};
  }
`;

const FunctionButton = (props) => {
  const {type, task} = props;
  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    props[TYPE_KEYS[type].action](TYPE_KEYS[type].getData(task));
  };

  return <StyledFunctionButton type={type} onClick={handleClick}/>
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasksAct: (task) => updateTasksAct(dispatch, task),
    setModalStatusAct: (data) => setModalStatusAct(dispatch, data),
    editTaskAct: (data) => {
      editTaskAct(dispatch, data.id);
      setModalStatusAct(dispatch, data.modalStatus);
    }
  }
};

FunctionButton.propTypes = {
  task: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  updateTasksAct: PropTypes.func.isRequired,
  editTaskAct: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TooltipContainer(FunctionButton));