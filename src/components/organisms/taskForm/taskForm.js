import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../atoms/buttons/button';
import ColorSampler from '../../atoms/colorSampler/colorSampler';
import Label from '../../atoms/label/label';
import Input from '../../atoms/input/input';
import Row from '../../atoms/row/row';
import ActionRow from '../../atoms/actionRow/actionRow';
import TextArea from '../../atoms/textArea/textArea';
import Paragraph from '../../atoms/paragraph/paragraph';
import Heading from '../../atoms/heading/heading';

import updateTasksAct from '../../../_redux/actions/updateTasksAct';
import createTaskAct from '../../../_redux/actions/createTaskAct';
import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';
import editTaskAct from "../../../_redux/actions/editTaskAct";

const TASK_MODEL = {
  'name': '',
  'color': '#ff0000',
  'popular': false,
  'description': '',
  'status': '',
};

const StyledColorSampler = styled(ColorSampler)`
  margin: 0 20px 0 0;
`;

class TaskForm extends React.Component {

  state = {
  	_id: this.props.editedTask ? this.props.editedTask._id : '',
    color: this.props.editedTask ? this.props.editedTask.color : '#ff0000',
    topicName: this.props.editedTask ? this.props.editedTask.name : 'new task',
    topicDescription: this.props.editedTask ? this.props.editedTask.description : ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {taskFormType, editedTask, updateTasksAct, createTaskAct, setModalStatusAct} = this.props;
    const {topicName, topicDescription, color} = this.state;
    if(taskFormType === 'EDIT') {
      updateTasksAct({...editedTask, name: topicName, description: topicDescription, color: color});
    } else if (taskFormType === 'CREATE') {
      createTaskAct({...TASK_MODEL, name: topicName, description: topicDescription, color: color});
    }
		setModalStatusAct({type: 'TASK', action: 'DISPLAY'});
  };

  updateColor = (data) => {
    this.setState({
      color: data.color
    });
  };

  updateTaskName = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  
  editTask = () => {
		const {setModalStatusAct, editTaskAct} = this.props;
		const {_id} = this.state;
		editTaskAct(_id);
		setModalStatusAct({type: 'TASK', action: 'EDIT'});
	};

  render() {
  	const {taskFormType} = this.props;
    const { topicName, topicDescription, color} = this.state;
    return (
    	<>
				{
					taskFormType !== 'DISPLAY' &&
					<form onSubmit={this.handleSubmit}>
						<Row>
							<Label htmlFor="topicName">Topic name</Label>
							<Input id="topicName" onChange={this.updateTaskName} value={topicName}/>
						</Row>
						<Row>
							<Label htmlFor="topicDescription">Topic description</Label>
							<TextArea id="topicDescription" onChange={this.updateTaskName} value={topicDescription}/>
						</Row>
						<ActionRow>
							<Label color={color} htmlFor="colorSampler">Choose color</Label>
							<StyledColorSampler id="colorSampler" color={color} name={topicName} handlerChange={this.updateColor}/>
							<Button red={false}>Save</Button>
						</ActionRow>
					</form>
				}
				{
					taskFormType === 'DISPLAY' &&
					<>
						<Row>
							<Heading color={color}>
								{topicName}
							</Heading>
							<Paragraph>
								{topicDescription}
							</Paragraph>
						</Row>
						<ActionRow>
							<Button red={false} onClick={this.editTask}>Edit</Button>
						</ActionRow>
					</>
				}
			
			</>
    
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editedTask: state.tasks.find((item) => state.editedTaskId === item._id)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasksAct: (data) => updateTasksAct(dispatch, data),
    createTaskAct: (data) => createTaskAct(dispatch, data),
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status),
		editTaskAct: (id) => editTaskAct(dispatch, id)
  }
};

TaskForm.propTypes = {
  taskFormType: PropTypes.string.isRequired,
  editedTask: PropTypes.object,
  updateTasksAct: PropTypes.func.isRequired,
  createTaskAct: PropTypes.func.isRequired,
  setModalStatusAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);