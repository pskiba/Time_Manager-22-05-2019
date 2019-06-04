import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SlideButton from '../../atoms/slideButton/slideButton';
import Hour from '../../molecules/hour/hour';
import Quarter from '../../atoms/quarter/quarter';
import { connect } from 'react-redux';
import updateTasksAct from '../../../_redux/actions/updateTasksAct';
import ModuleName from '../../atoms/moduleName/moduleName';


const HOURS = [
  '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

const TYPE_KEYS = {
  toDo: 'To do',
  done: 'Done'
};

const StyledWrapper = styled.div`
  width: 920px;
  margin: 20px auto;
`;

const StyledTimeBarType = styled(ModuleName)`
  padding: 0 0 0 45px;
`;

const StyledInnerWrapper = styled.div`
  width: 920px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSliderWrapper = styled.div`
  position: relative;
  width: 840px;
  height: 24px;
  overflow: hidden;
`;

const StyledSlider = styled.div`
  position: absolute;
  width: 1440px;
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({positionX}) => positionX * 60}px);
`;

class TimeBar extends React.Component {

  state = {
    hoursContainerPosition: 0
  };

  getQuarter = (index) => {
    const {tasks, type, currentDate} = this.props;
    for(let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      let taskDate = task.date[currentDate];
      if(taskDate && taskDate[type] && taskDate[type].indexOf(index) > -1) {
        return {name: task.name, color: task.color}
      }
    }
    return {name: 'empty', color: '#ffffff'}
  };

  getQuarters = () => {
    let quarters = [];
    for(let i = 0; i < 96; i++) {
      quarters.push(this.getQuarter(i));
    }
    return quarters;
  };

  handleClick = (quarter) => {
    const {currentTaskName, type, tasks, updateTasksAct, currentDate} = this.props;
    if(!currentTaskName) return;

    const currentTask = tasks.find((item) => item.name === currentTaskName);

    if(!currentTask.date[currentDate]) {
      currentTask.date[currentDate] = {
        'toDo': [],
        'done': []
      }
    }
    const positions = currentTask.date[currentDate][type];
    let data = {};

    data.currentTask = {...currentTask};

    if(quarter.name === currentTask.name) {

      data.currentTask.date[currentDate][type] = positions.filter((item) => item !== quarter.position);

    } else if(quarter.name === 'empty') {

      data.currentTask.date[currentDate][type].push(quarter.position);

    } else {

      data.currentTask.date[currentDate][type].push(quarter.position);
      data.previousTask = tasks.find((task) => task.name === quarter.name);
      data.previousTask.date[currentDate][type] = data.previousTask.date[currentDate][type].filter((item) => item !== quarter.position);
    }

    updateTasksAct(data);
  };

  changeSliderPosition = (value) => {
    const newPosition = this.state.hoursContainerPosition - value;
    if(newPosition > -11 && newPosition < 1) {
      this.setState({
        hoursContainerPosition: newPosition
      });
    }
  };

  render() {
    const {type} = this.props;
    return (
      <StyledWrapper>
        <StyledTimeBarType>{TYPE_KEYS[type]}</StyledTimeBarType>
        <StyledInnerWrapper>
          <SlideButton left={true} callBack={this.changeSliderPosition}/>
          <StyledSliderWrapper>
            <StyledSlider positionX={this.state.hoursContainerPosition}>
              {HOURS.map((item) => <Hour key={item}>{item}</Hour>)}
              {this.getQuarters().map((item, index) => <Quarter key={index} position={index} name={item.name} color={item.color} callBack={this.handleClick} />)}
            </StyledSlider>
          </StyledSliderWrapper>
          <SlideButton left={false} callBack={this.changeSliderPosition}/>
        </StyledInnerWrapper>
      </StyledWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentTaskName: state.currentTaskName,
    currentDate: state.currentDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasksAct: (data) => updateTasksAct(dispatch, data)
  }
};

TimeBar.propTypes = {
  type: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  currentTaskName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);