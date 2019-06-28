const logInAct = (dispatch, data) => {
  dispatch({type: 'LOG_IN_START'});
  fetch(window.location.origin + '/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.message === 'bed login or password') {
        dispatch({type: 'ISSUE', payload: response.message});
      } else if(response.error) {
        dispatch({type: 'ERROR', payload: response.error});
      } else if(response.user) {
        dispatch({type: 'LOG_IN', payload: response.user});
      }
    })
};

export default logInAct;