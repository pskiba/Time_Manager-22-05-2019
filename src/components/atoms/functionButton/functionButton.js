import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CheckMarkIcon from '../../../assets/checkmarkIcon.svg';
import EditIconIcon from '../../../assets/editIcon.svg';
import TrashIcon from '../../../assets/trashIcon.svg';

import removeFromPopularAct from '../../../_redux/actions/removeFromPopularAct';
import addToPopularAct from '../../../_redux/actions/addToPopularAct';
import editTaskAct from '../../../_redux/actions/editTaskAct';

const TYPE_KEYS = {
  'addToPopular': {
    icon: CheckMarkIcon,
    action: 'addToPopularAct'
  },
  'edit': {
    icon: EditIconIcon,
    action: 'editTaskAct'
  },
  'removeFromPopular': {
    icon: TrashIcon,
    action: 'removeFromPopularAct'
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
  const {type, name} = props;
  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    props[TYPE_KEYS[type].action](name);
  };

  return <StyledFunctionButton type={type} onClick={handleClick}/>
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromPopularAct: (name) => removeFromPopularAct(dispatch, name),
    addToPopularAct: (name) => addToPopularAct(dispatch, name),
    editTaskAct: (name) => editTaskAct(dispatch, name)
  }
};

FunctionButton.propTypes = {
  type: PropTypes.string.isRequired,
  removeFromPopularAct: PropTypes.func.isRequired,
  addToPopularAct: PropTypes.func.isRequired,
  editTaskAct: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FunctionButton);