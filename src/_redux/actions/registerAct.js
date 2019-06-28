const registerAct = (dispatch, data) => {
  dispatch({type: 'REGISTER_START'});
  fetch(window.location.origin + '/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((response) => {
      if(response.message === 'this email exist') {
        dispatch({type: 'ISSUE', payload: response.message});
      } else if(response.error) {
        dispatch({type: 'ERROR', payload: response.error});
      } else if(response.message === 'user was register') {
        dispatch({type: 'REGISTER', payload: response.message});
      }
    })
};

export default registerAct;