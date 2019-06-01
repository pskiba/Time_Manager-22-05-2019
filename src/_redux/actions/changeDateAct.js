const changeDateAct = (dispatch, date) => {
  dispatch({type: 'CHANGE_DATE', payload: date});
};

export default changeDateAct;