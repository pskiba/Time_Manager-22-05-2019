import React from 'react';
import styled from 'styled-components';
import TaskItem from '../../molecules/taskItem/taskItem';
import SelectButton from '../../atoms/buttons/selectButton';
import { connect } from 'react-redux';
import chooseTaskAct from '../../../_redux/actions/chooseTaskAct';
import updateTasksAct from '../../../_redux/actions/updateTasksAct'

const TYPE_KEYS = {
  'all': 'All tasks',
  'popular': 'Popular tasks'
};

const StyledTaskWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 20px;
`;

const StyledTaskList = styled.ul`
  position: absolute;
  border: 1px solid ${({theme}) => theme.color.black};
  padding: 10px 0 10px 0;
  margin: 0;
  display: inline-block;
  width: 400px;
  background-color: ${({theme}) => theme.color.white};
`;

class TasksSelector extends React.Component {

  state = {
    active: false,
    taskName: ''
  };

  toggleSelector = (e) => {
    this.setState({
      active: !this.state.active
    })
  };

  closeSelector = (e) => {
    setTimeout(() => {
      if(this.state.active && document.activeElement && document.activeElement.getAttribute('type') !== 'color') {
        this.setState({
          active: false
        })
      }
    }, 0);
  };

  selectTask = (_id) => {
    this.closeSelector();
    this.props.chooseTaskAct(_id);
  };

  updateTaskColor = (data) => {
    const {tasks, updateTasksAct} = this.props;
    let task = tasks.find((item) => item._id === data._id);
    task.color = data.color;
    updateTasksAct(task);
  };

  render() {
    const {active} = this.state;
    const {tasks, currentTaskId, type} = this.props;
    const tasksToDisplay = type === 'popular' ? tasks.filter((item) => item.popular) : tasks;
    const currentTask = tasksToDisplay.find((item) => item._id === currentTaskId);

    return (
      <StyledTaskWrapper tabIndex={0} onBlur={this.closeSelector}>
        <SelectButton active={active} onClick={this.toggleSelector} color={currentTask ? currentTask.color : 'white'} >
          {
          	currentTask ? currentTask.name : TYPE_KEYS[type]
          }
        </SelectButton>
        {
					active &&
          <StyledTaskList>
            {
              tasksToDisplay.map((item, index) => <TaskItem key={index} task={item} type={type} selectTask={this.selectTask} updateTaskColor={this.updateTaskColor} />)
            }
          </StyledTaskList>
        }
      </StyledTaskWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentTaskId: state.currentTaskId
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseTaskAct: (name) => chooseTaskAct(dispatch, name),
    updateTasksAct: (date) => updateTasksAct(dispatch, date)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksSelector);