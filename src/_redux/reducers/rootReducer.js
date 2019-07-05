const initState = {
  email: '',
  _id: '',
  tasks: [],
  dates: [],
  currentTaskId: '',
  currentDate: new Date().toString().split(' ').splice(0, 4).join(' '),
  actualDate: new Date().toString().split(' ').splice(0, 4).join(' '),
  modalStatus: '',
  editedTaskId: '',
  responseWaiting: false,
  error: '',
  issueMessage: '',
  registerStatus: '',
  loginStatus: sessionStorage.getItem('userId') ? 'log in' : '',
  beforeUploadData: true,
  minute: new Date().getHours() * 60 + new Date().getMinutes()

};

const rootReducer = (state = initState, action) => {
  console.log(action);
  switch(action.type) {
    case 'TIMER':
      return {
        ...state,
        minute: action.payload
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        issueMessage: '',
        error: ''
      };
    case 'LOG_OUT':
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      return {
        ...initState
      };
    case 'DOWNLOAD_DATA_START':
      return {
        ...state,
        responseWaiting: true
      };
    case 'DOWNLOAD_DATA':
      return {
        ...state,
        tasks: action.payload.tasks ? action.payload.tasks : [],
        dates: action.payload.dates ? action.payload.dates : [],
        email: action.payload.email,
        _id: action.payload._id,
        loginStatus: 'log in',
        responseWaiting: false,
        beforeUploadData: false
      };
    case 'CREATE_TASK_START':
      return {
        ...state,
        issueMessage: '',
        responseWaiting: true
      };
    case 'LOG_IN':
      if(action.payload && action.payload.token) {
        sessionStorage.setItem('token', 'Bearer ' + action.payload.token);
        sessionStorage.setItem('userId', action.payload._id);
      }
      return {
        ...state,
        tasks: action.payload.tasks ? action.payload.tasks : [],
        dates: action.payload.dates ? action.payload.dates : [],
        email: action.payload.email,
        _id: action.payload._id,
        loginStatus: 'log in',
        responseWaiting: false,
        beforeUploadData: false
      };
    case 'LOG_IN_START':
      return {
        ...state,
        error: '',
        issueMessage: '',
        responseWaiting: true
      };
    case 'CLEAR_REGISTER_STATUS':
      return {
        ...state,
        registerStatus: ''
      };
    case 'REGISTER':
      return {
        ...state,
        registerStatus: action.payload,
        responseWaiting: false
      };
    case 'REGISTER_START':
      return {
        ...state,
        responseWaiting: true
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'ISSUE':
      return {
        ...state,
        issueMessage: action.payload
      };
    case 'CHANGE_DATE':
      return {
        ...state,
        currentDate: action.payload
      };
    case 'EDIT_TASK':
      return {
        ...state,
        editedTaskId: action.payload
      };
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        currentTaskId: action.payload._id,
        responseWaiting: false
      };
    case 'SET_MODAL_STATUS':
      return {
        ...state,
        modalStatus: action.payload,
        editedTaskId: action.payload ? state.editedTaskId : ''
      };
    case 'CHOOSE_TASK':
      return {
        ...state,
        currentTaskId: action.payload
      };
		case 'UPDATE_TASK_START':
			return {
				...state,
				responseWaiting: true
			};
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((item) => action.payload._id === item._id ? action.payload : item),
        editedTaskId: '',
        currentTaskId: action.payload._id,
				responseWaiting: false
      };
    case 'UPDATE_DATES_START': {
      return {
        ...state,
        responseWaiting: true
      };
    }
    case 'UPDATE_DATES':
      return {
        ...state,
        responseWaiting: false,
        dates: action.payload.isNew ? [...state.dates, action.payload.dateItem] : state.dates.map((item) => {
          return item.date === action.payload.dateItem.date ? action.payload.dateItem : item
        })
      };
    default :
      return {
        ...state
      };
  }
};


export default rootReducer;