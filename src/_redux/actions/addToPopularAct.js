const addToPopularAct = (dispatch, name) => {
  dispatch({type: 'ADD_TO_POPULAR', payload: name});
};

export default addToPopularAct;