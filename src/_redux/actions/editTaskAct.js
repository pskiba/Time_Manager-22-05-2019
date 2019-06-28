const editTaskAct = (dispatch, _id) => {
  dispatch({type: 'EDIT_TASK', payload: _id});
};

export default editTaskAct;