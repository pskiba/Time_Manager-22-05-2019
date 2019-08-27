import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SlideButton from '../../atoms/buttons/slideButton';
import Hour from '../../molecules/hour/hour';
import Quarter from '../../molecules/quarter/quarter';
import { connect } from 'react-redux';
import ModuleName from '../../atoms/moduleName/moduleName';
import WatchTip from '../../molecules/watchTip/watchTip';
import Marker from '../../molecules/marker/marker';

import updateDatesDeepAct from '../../../_redux/actions/updateDatesDeepAct';
import updateDatesAct from '../../../_redux/actions/updateDatesAct';

const HOURS = [
  '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

const QUARTER_IN_MILLISECONDS = 15 * 60 * 1000;

const TYPE_KEYS = {
  toDo: 'To do',
  done: 'Done'
};

const StyledWrapper = styled.div`
  width: 920px;
  margin: 0 auto 0;
  padding: 20px 0 20px 0;
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
    position: absolute;
    left: 40px;
    width: 840px;
    height: 24px;
    clip: rect(-100px,840px,50px,0px);
`;

const StyledSlider = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  transition: transform 0.08s linear;
  transform: translateX(${({positionX}) => positionX * 60}px);
`;

class TimeBar extends React.Component {
	
  state = {
    hoursContainerPosition: -7,
		newDateWasCreate: false,
		newDateShouldBeSaved: false
  };
	
	sliderNodeRef = React.createRef();
	
	shouldComponentUpdate(nextProps, nextState) {
		const {type, currentDateObj, tasks} = this.props;

		return !currentDateObj
						|| (currentDateObj && JSON.stringify(currentDateObj[type]) !== JSON.stringify(nextProps.currentDateObj[type])
						|| JSON.stringify(tasks) !== JSON.stringify(nextProps.tasks))
	}

  getQuarter = (_id) => {
    const {tasks} = this.props;
    const task = tasks.find((item) => item._id === _id);
    return {_id: task._id, name: task.name, description: task.description, color: task.color}

  };

  getQuarters = () => {
    const {type, currentDateObj} = this.props;
    const quartersPositions = currentDateObj ? currentDateObj[type] : null;
    let quarters = [];
    for(let i = 0; i < 96; i++) {
      if(quartersPositions && quartersPositions[i]) {
        quarters.push(this.getQuarter(quartersPositions[i]));
      } else {
        quarters.push({_id: null, name: '', description: '', color: '#ffffff'});
      }
    }
    return quarters;
  };

  isToLateOrToEarly = (type, position, currentDate) => {
    const selectedTimeInMilS = position * QUARTER_IN_MILLISECONDS;
    const currentDateInMilS = new Date(currentDate).getTime();
    if(type === 'done' && new Date(currentDateInMilS + selectedTimeInMilS).getTime() > new Date().getTime()) {
      alert('you can not report that task was done in the future');
      return true;
    } else if (type === 'toDo' && new Date(currentDateInMilS + selectedTimeInMilS).getTime() + QUARTER_IN_MILLISECONDS < new Date().getTime()) {
      alert('you can not mark tasks to do in the past');
      return true;
    }
    return false;
  };
  
  handleOut = (e) => {
  
		const {updateDatesDeepAct, currentDateObj} = this.props;
		const {newDateWasCreate, newDateShouldBeSaved} = this.state;
		let data = {};
	
		if(!newDateShouldBeSaved) return;
		
		let dateItem = currentDateObj;
		
		if(dateItem) {
			data.isNew = newDateWasCreate;
			data.dateItem = dateItem;
			
			this.setState({
				newDateWasCreate: false,
				newDateShouldBeSaved: false,
			});
			updateDatesDeepAct(data);
		}
		
	};

  changeSliderPosition = (value) => {
    const newPosition = this.state.hoursContainerPosition - value;
    if(newPosition > -11 && newPosition < 1) {
      this.setState({
        hoursContainerPosition: newPosition
      });
	
			this.sliderNodeRef.current.style.transform = `translateX(${newPosition * 60}px)`;
    }
  };
	
	updateQuarters = (pStart, pEnd) => {
		const {currentTaskId, type, updateDatesAct, currentDate, currentDateObj} = this.props;
		let data = {};
		
		if(!currentTaskId) return;
		
		if(this.isToLateOrToEarly(type, pStart, currentDate)) return;
		
		let dateItem = {...currentDateObj};

		if(Object.entries(dateItem).length === 0) {
			data.dateItem = { 'date': currentDate, 'done': {}, 'toDo': {}, 'note': '', 'intervalReminders': [], 'reminders': []};
			data.isNew = true;
			this.setState({
				newDateWasCreate: true
			});
		} else {
			data.dateItem = dateItem;
		}
		data.dateItem[type] = {...data.dateItem[type]};
		
		for(let i = pStart; i < pEnd; i++) {
			if(data.dateItem[type][i] === currentTaskId) {
				delete data.dateItem[type][i]
			} else {
				data.dateItem[type][i] = currentTaskId;
			}
		}
		
		this.setState({
			newDateShouldBeSaved: true
		});
		updateDatesAct(data);
	};

  render() {
  	console.log('render');
    const {type, actualDate, currentDate} = this.props;
    const quarters = this.getQuarters();
	
		return (
      <StyledWrapper onMouseLeave={this.handleOut} onMouseMove={(e) => e.preventDefault()}>
        <StyledTimeBarType>{TYPE_KEYS[type]}</StyledTimeBarType>
        <StyledInnerWrapper>
          <SlideButton left={true} callBack={this.changeSliderPosition}/>
          <StyledSliderWrapper>
            <StyledSlider positionX={this.state.hoursContainerPosition} ref={this.sliderNodeRef}>
							<Marker updateQuarters={this.updateQuarters}/>
              {(type === 'toDo' && actualDate === currentDate) && <WatchTip />}
              {HOURS.map((item) => <Hour key={item}>{item}</Hour>)}
              {quarters.map((item, index) => <Quarter type="transparent" key={index} position={index} title={item.name} description={item.description} color={item.color}  />)}
              {quarters.map((item, index) => <Quarter type="color" key={index} position={index} title={item.name} description={item.description} color={item.color} />)}
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
    dates: state.dates,
    currentTaskId: state.currentTaskId,
    currentDate: state.currentDate,
		currentDateObj: state.currentDateObj,
    actualDate: state.actualDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDatesAct: (data) => updateDatesAct(dispatch, data),
		updateDatesDeepAct: (data) => updateDatesDeepAct(dispatch, data)
  }
};

TimeBar.propTypes = {
  type: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  currentTaskId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);