const saveEditedTaskAct = (dispatch, data) => {
  dispatch({type: 'SAVE_EDITED_TASK', payload: data});
};

export default saveEditedTaskAct;