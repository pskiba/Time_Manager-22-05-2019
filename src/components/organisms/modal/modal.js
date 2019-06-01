import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../atoms/button/button';
import ColorSampler from '../../atoms/colorSampler/colorSampler';
import Label from '../../atoms/label/label';

import saveEditedTaskAct from '../../../_redux/actions/saveEditedTaskAct';
import createTaskAct from '../../../_redux/actions/createTaskAct';
import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';

const TASK_MODEL = {
  'name': '',
  'toDo': [],
  'done': [],
  'color': '#ff0000',
  'popular': false
};

const StyledModalWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const StyledModalBody = styled.div`
  position: relative;
  align-self: flex-start;
  top: 20vh;
  width: 60%;
  max-width: 700px;
  padding: 35px 35px 25px 35px;
  background: ${({theme}) => theme.color.white};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
`;

const StyledActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  width: 100%;
`;

const StyledColorSampler = styled(ColorSampler)`
  margin: 0 10px 0 10px;
`;

class Modal extends React.Component {

  state = {
    color: this.props.editedTask ? this.props.editedTask.color : '#ff0000',
    topicName: this.props.editedTask ? this.props.editedTask.name : 'new task'
  };

  close = (e) => {
    if (e && e.target && e.target.id === 'modal-wrapper') {
      this.props.setModalStatusAct('closed');
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {modalStatus, editedTask, saveEditedTaskAct, createTaskAct} = this.props;
    if(modalStatus === 'edit') {
      saveEditedTaskAct({...editedTask, name: this.state.topicName, color: this.state.color});
    } else if (modalStatus === 'creat') {
      createTaskAct({...TASK_MODEL, name: this.state.topicName, color: this.state.color});
    }
  };

  updateColor = (data) => {
    this.setState({
      color: data.color
    });
  };

  updateTaskName = (e) => {
    this.setState({
      topicName: e.target.value,
    });
  };

  render() {
    const {topicName, color} = this.state;
    return (
      <StyledModalWrapper onClick={this.close} id="modal-wrapper">
        <StyledModalBody>
          <form onSubmit={this.handleSubmit}>
            <StyledTextArea onChange={this.updateTaskName} value={topicName}/>
            <StyledActionSection>
              <Label color={color} htmlFor="colorSampler">Choose color</Label>
              <StyledColorSampler id="colorSampler" color={color} name={topicName} handlerChange={this.updateColor}/>
              <Button red={false}>Save</Button>
            </StyledActionSection>
          </form>
        </StyledModalBody>
      </StyledModalWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalStatus,
    editedTask: state.tasks.find((item) => state.editedTaskName === item.name)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveEditedTaskAct: (data) => saveEditedTaskAct(dispatch, data),
    createTaskAct: (data) => createTaskAct(dispatch, data),
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status)
  }
};

Modal.propTypes = {
  modalStatus: PropTypes.string.isRequired,
  editedTask: PropTypes.object,
  saveEditedTaskAct: PropTypes.func.isRequired,
  createTaskAct: PropTypes.func.isRequired,
  setModalStatusAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);