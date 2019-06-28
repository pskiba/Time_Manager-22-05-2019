const createTaskAct = (dispatch, data) => {
  const authorization = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  dispatch({type: 'CREATE_TASK_START', payload: null});
  fetch(window.location.origin + '/api/user/create_task/' + userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.error) {
        dispatch({type: 'ERROR', payload: response.error});
      } else if(response && response.message === 'task with this name exists') {
        dispatch({type: 'ISSUE', payload: response.message});
      } else if(response && response.task) {
        dispatch({type: 'CREATE_TASK', payload: response.task});
      }

    })


};

export default createTaskAct;