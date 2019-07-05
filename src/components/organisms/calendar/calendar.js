import React from 'react';
import styled from 'styled-components';

import QuantityButton from '../../atoms/buttons/quantityButton';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Wrapper = styled.div.attrs({
  tabIndex: 0,
})`
  position: absolute; 
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  top: 50px;
  border: 1px solid ${({theme}) => theme.color.darkgray};
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.4);
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled.div`
  display: inline-block;
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.regular};
  background: ${({theme}) => theme.color.white};
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px 10px 8px;
  align-items: center;
`;

const DateWrapper = styled.div`
  font-size: ${({theme}) => theme.fontSize.l};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 50px;
  justify-content: space-between;
`;

const Table = styled.table`
  padding: 5px;
`;

const Th = styled.th`
  width: 35px;
  height: 20px;
  border: 1px solid ${({theme}) => theme.color.black};
  vertical-align: middle;
`;

const Td = styled.td`
  width: 35px;
  text-align: center;
  vertical-align: middle;
  height: 20px;
  border: 1px solid ${({theme}) => theme.color.black};
  background: ${({theme}) => theme.color.darkgray};
`;

const ActiveTd = styled.td`
  width: 35px;
  text-align: center;
  vertical-align: middle;
  height: 20px;
  border: 1px solid ${({theme}) => theme.color.black};
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    background: ${({theme}) => theme.color.darkgray};
    color: ${({theme}) => theme.color.white};
  }
`;

class Calendar extends React.Component {

  state = {
    date: new Date()
  };
  wrapperRef = React.createRef();

  getTable = () => {
    const date = this.state.date;
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month).getDay() - 1;
    let table = [];
    let number = 1;

    for(let i = 0; i < 6; i++) {
      let row = [];
      for(let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || (number > daysInMonth)) {
          row[j] = '';
        }  else {
          row[j] = number;
          number += 1;
        }
      }
      table.push(row);
    }
    return table;
  };

  changeDate = (value) => {
    let newDate;
    const {date} = this.state;
    newDate = new Date(date.getFullYear(), date.getMonth() + value);
    this.setState({
      date: newDate
    });
  };

  chooseDay = (e) => {
    const {calendarOff, chooseDay} = this.props;
    const {date} = this.state;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = e.target.textContent;
    const newDate = new Date(year, month, day);
    chooseDay(newDate);
    calendarOff();
  };

  calendarOff = () => {
    this.props.calendarOff();
  };

  componentDidMount() {
    this.wrapperRef.current.focus();
    // this.wrapperRef.focus();
  }

  render() {
    const {date} = this.state;
    const table = this.getTable();
    const year = date.getFullYear();
    const month = date.getMonth();
    return (
      <Wrapper ref={this.wrapperRef} tabindex="0" onBlur={this.calendarOff}>
        <Container>
          <TopSection>
            <DateWrapper>
              {year} {MONTHS[month]}
            </DateWrapper>
            <ButtonsWrapper>
              <QuantityButton onClick={() => this.changeDate(-1)}>&#60;</QuantityButton>
              <QuantityButton onClick={() => this.changeDate(1)}>&#x3e;</QuantityButton>
            </ButtonsWrapper>
          </TopSection>
          <Table>
            <thead>
              <tr>
                {
                  DAYS.map((item) => <Th key={item}>{item}</Th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                table.map((row) => {
                  return (
                    <tr>
                      {row.map((cell) => cell ? <ActiveTd onClick={this.chooseDay}>{cell}</ActiveTd> : <Td></Td>)}
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Container>
      </Wrapper>
    )
  }
}

export default Calendar;