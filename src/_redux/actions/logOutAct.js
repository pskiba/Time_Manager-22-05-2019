const logOutAct = (dispatch) => {
  dispatch({type: 'LOG_OUT', payload: null});
};
export default logOutAct;