const timerAct = (dispatch, minute) => {
  dispatch({type: 'TIMER', payload: minute})
};

export default timerAct;