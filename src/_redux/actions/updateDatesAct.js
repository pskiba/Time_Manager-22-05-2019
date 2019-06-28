const updateDatesAct = (dispatch, data) => {
  const userId = sessionStorage.getItem('userId');
  const authorization = sessionStorage.getItem('token');
  dispatch({type: 'UPDATE_DATES_START', payload: null});
  fetch(window.location.origin + '/api/user/update_date/' + userId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if(response.message === 'dates was updated') {
        dispatch({type: 'UPDATE_DATES', payload: data});
      } else if(response.error) {

      } else if(response.message) {

      }
    });



};

export default updateDatesAct;