const updateTasksAct = (dispatch, data) => {
  const authorization = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  
	dispatch({type: 'UPDATE_TASK_START', payload: null});
	console.log(data);
  fetch(window.location.origin + '/api/user/update_task/' + userId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
			dispatch({type: 'UPDATE_TASK', payload: data});
    });
  
};

export default updateTasksAct;