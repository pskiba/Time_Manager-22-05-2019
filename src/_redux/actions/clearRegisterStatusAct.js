const clearRegisterStatusAct = (dispatch) => {
  dispatch({type: 'CLEAR_REGISTER_STATUS', payload: null});
};

export default clearRegisterStatusAct;