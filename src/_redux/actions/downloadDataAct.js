const downloadDataAct = (dispatch) => {
  const userId = sessionStorage.getItem('userId');
  const authorization = sessionStorage.getItem('token');
  dispatch({type: 'DOWNLOAD_DATA_START', payload: null});
  fetch(window.location.origin + '/api/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.user) {
        dispatch({type: 'DOWNLOAD_DATA', payload: response.user});
      } else if(response.error) {
        dispatch({type: 'ERROR', payload: response.error});
      } else if(response.message) {
        dispatch({type: 'ISSUE', payload: response.message});
      }
    })
};

export default downloadDataAct;