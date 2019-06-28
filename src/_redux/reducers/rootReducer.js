const initState = {
  email: '',
  _id: '',
  tasks: [],
  dates: [],
  currentTaskId: '',
  currentDate: new Date().toString().split(' ').splice(0, 4).join(' '),
  modalStatus: 'closed',
  editedTaskId: '',
  responseWaiting: false,
  error: '',
  issueMessage: '',
  registerStatus: '',
  loginStatus: sessionStorage.getItem('userId') ? 'log in' : '',
  beforeUploadData: true
};

const rootReducer = (state = initState, action) => {
  console.log(action);
  switch(action.type) {
    case 'CLEAR_MESSAGES': {
      return {
        ...state,
        issueMessage: '',
        error: ''
      };
      break;
    }
    case 'LOG_OUT': {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      return {
        ...initState
      };
      break;
    }
    case 'DOWNLOAD_DATA_START': {
      return {
        ...state,
        responseWaiting: true
      };
      break;
    }
    case 'DOWNLOAD_DATA': {
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
      break;
    }
    case 'CREATE_TASK_START':
      return {
        ...state,
        issueMessage: '',
        responseWaiting: true
      };
      break;
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
      break;
    case 'LOG_IN_START':
      return {
        ...state,
        error: '',
        issueMessage: '',
        responseWaiting: true
      };
      break;
    case 'CLEAR_REGISTER_STATUS':
      return {
        ...state,
        registerStatus: ''
      };
      break;
    case 'REGISTER':
      return {
        ...state,
        registerStatus: action.payload,
        responseWaiting: false
      };
      break;
    case 'REGISTER_START':
      return {
        ...state,
        responseWaiting: true
      };
      break;
    case 'ERROR':
      return {
        ...state,
        error: action.payload
      };
      break;
    case 'ISSUE':
      return {
        ...state,
        issueMessage: action.payload
      };
      break;
    case 'CHANGE_DATE':
      return {
        ...state,
        currentDate: action.payload
      };
      break;
    case 'EDIT_TASK':
      return {
        ...state,
        editedTaskId: action.payload,
        modalStatus: 'edit'
      };
      break;
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        currentTaskId: action.payload._id,
        modalStatus: 'closed',
        responseWaiting: false
      };
      break;
    case 'SET_MODAL_STATUS':
      return {
        ...state,
        modalStatus: action.payload
      };
      break;
    case 'CHOOSE_TASK':
      return {
        ...state,
        currentTaskId: action.payload
      };
      break;
    case 'UPDATE_TASKS':
      return {
        ...state,
        tasks: state.tasks.map((item) => action.payload._id === item._id ? action.payload : item),
        editedTaskId: '',
        currentTaskId: action.payload._id,
        modalStatus: 'closed'
      };
      break;
    case 'UPDATE_DATES_START': {
      return {
        ...state,
        responseWaiting: true
      };
      break;
    }
    case 'UPDATE_DATES':
      return {
        ...state,
        responseWaiting: false,
        dates: action.payload.isNew ? [...state.dates, action.payload.dateItem] : state.dates.map((item) => {
          return item.date === action.payload.dateItem.date ? action.payload.dateItem : item
        })
      };
      break;
    default :
      return {
        ...state
      };
  }
};


export default rootReducer;