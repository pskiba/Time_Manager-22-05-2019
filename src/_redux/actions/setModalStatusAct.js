const setModalStatusAct = (dispatch, status) => {
  dispatch({type: 'SET_MODAL_STATUS', payload: status})
};

export default setModalStatusAct;