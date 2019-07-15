const setGlobalReminder = (dispatch, data) => {
	const userId = sessionStorage.getItem('userId');
	const authorization = sessionStorage.getItem('token');
	fetch(window.location.origin + '/api/user/update_global_interval/' +  userId, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': authorization
			},
			body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			console.log('-------------------------');
			console.log(response);
			if(response && response.message === 'Global interval reminders was updated') {
				dispatch({type: 'SET_GLOBAL_REMINDER', payload: data});
			}
		})
};

export default setGlobalReminder;