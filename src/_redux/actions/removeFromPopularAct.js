const removeFromPopularAct = (dispatch, name) => {
  dispatch({type: 'REMOVE_FROM_POPULAR', payload: name});
};

export default removeFromPopularAct;