const updateTaskColorAct = (dispatch, data) => {
  dispatch({type: 'UPDATE_TASK_COLOR', payload: data});
};

export default updateTaskColorAct;