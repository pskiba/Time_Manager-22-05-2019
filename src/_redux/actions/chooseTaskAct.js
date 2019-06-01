const chooseTaskAct = (dispatch, taskName) => {
  dispatch({type: 'CHOOSE_TASK', payload: taskName})
};

export default chooseTaskAct;