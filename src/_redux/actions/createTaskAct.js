const createTaskAct = (dispatch, data) => {
  dispatch({type: 'CREATE_TASK', payload: data});
};

export default createTaskAct;