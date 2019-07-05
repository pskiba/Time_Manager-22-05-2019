import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../atoms/buttons/button';
import Label from '../../atoms/label/label';
import Row from '../../atoms/row/row';
import Heading from '../../atoms/heading/heading';
import ActionRow from '../../atoms/actionRow/actionRow';
import TextArea from '../../atoms/textArea/textArea';

import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';
import updateDatesAct from '../../../_redux/actions/updateDatesAct';

const StyledLightItalic = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.light};
  font-style: italic;
`;

class Note extends React.Component {

  state = {
    note: this.props.date ? this.props.date.note : '',

  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {date, currentDate, setModalStatusAct, updateDatesAct} = this.props;
    const {note} = this.state;
    let data = {};

    if(!date) {
      data.dateItem = { 'date': currentDate, 'done': {}, 'toDo': {}, 'note': note, 'intervalValue': 0, 'remindersList': []};
      data.isNew = true;
    } else {
      data.dateItem = {...date, 'note': note};
    }

    updateDatesAct(data);
    setModalStatusAct({type: 'NOTE', action: 'DISPLAY'});
  };

  editNote = () => {
    this.props.setModalStatusAct({type: 'NOTE', action: 'EDIT'});
  };

  updateTaskName = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  render() {
    const { note } = this.state;
    const { currentDate, state} = this.props;
    return (
      <>
        <Row>
          <Heading>Note <StyledLightItalic>{currentDate}</StyledLightItalic></Heading>
        </Row>
        {
          state === 'EDIT' &&
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Label htmlFor="note">Edit Note</Label>
              <TextArea id="note" onChange={this.updateTaskName} value={note}/>
            </Row>
            <ActionRow>
              <Button red={false}>Save</Button>
            </ActionRow>
          </form>
        }
        {
          state === 'DISPLAY' &&
          <>
            <div>
              {note}
            </div>
            <ActionRow>
              <Button onClick={this.editNote} red={false}>Edit</Button>
            </ActionRow>
          </>
        }
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status),
    updateDatesAct: (data) => updateDatesAct(dispatch, data)
  }
};

const mapStateToProps = (state) => {
  return {
    date: state.dates.find((item) => item.date === state.currentDate),
    currentDate: state.currentDate
  }
};

Note.propTypes = {
  state: PropTypes.string.isRequired,
  setModalStatusAct: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);