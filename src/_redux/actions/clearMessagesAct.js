const clearMessagesAct = (dispatch) => {
  dispatch({type: 'CLEAR_MESSAGES', payload: null});
};

export default clearMessagesAct;