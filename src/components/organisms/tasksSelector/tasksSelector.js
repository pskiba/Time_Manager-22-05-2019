import React from 'react';
import styled from 'styled-components';
import TaskItem from '../../molecules/taskItem/taskItem';
import SelectButton from '../../atoms/selectButton/selectButton';
import { connect } from 'react-redux';
import chooseTaskAct from '../../../_redux/actions/chooseTaskAct';
import updateTaskColorAct from '../../../_redux/actions/updateTaskColorAct'

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

  selectTask = (name) => {
    this.closeSelector();
    this.props.chooseTaskAct(name);
  };

  updateTaskColor = (date) => {
    this.props.updateTaskColorAct(date);
  };

  render() {
    const {active} = this.state;
    const {tasks, currentTaskName, type} = this.props;
    const tasksToDisplay = type === 'popular' ? tasks.filter((item) => item.popular) : tasks;
    const currentTask = tasksToDisplay.find((item) => item.name === currentTaskName);

    return (
      <StyledTaskWrapper tabIndex={0} onBlur={this.closeSelector}>
        <SelectButton active={active} onClick={this.toggleSelector} color={currentTask ? currentTask.color : 'white'} >
          {currentTask ? currentTask.name : TYPE_KEYS[type]}
        </SelectButton>
        {active &&
          <StyledTaskList>
            {
              tasksToDisplay.map((item, index) => <TaskItem key={index} color={item.color} type={type} selectTask={this.selectTask} updateTaskColor={this.updateTaskColor} >{item.name}</TaskItem>)
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
    currentTaskName: state.currentTaskName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseTaskAct: (name) => chooseTaskAct(dispatch, name),
    updateTaskColorAct: (date) => updateTaskColorAct(dispatch, date)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksSelector);