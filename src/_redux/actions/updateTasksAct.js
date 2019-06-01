const updateTasksAct = (dispatch, data) => {
  dispatch({type: 'UPDATE_TASKS', payload: data})
};

export default updateTasksAct;