const editTaskAct = (dispatch, name) => {
  dispatch({type: 'EDIT_TASK', payload: name});
};

export default editTaskAct;