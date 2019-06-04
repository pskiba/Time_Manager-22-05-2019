const initState = {
  tasks: [
    {
      'name': 'reading in english',
      'description': '',
      'status': '',
      'color': '#ff0000',
      'popular': false,
      'date': {
        'Sun Jun 02 2019': {
          'toDo': [0,1,5,6,7],
          'done': [0,1,5,6,7]
        },
        'Mon Jun 03 2019': {
          'toDo': [6,7],
          'done': [6,7]
        },
        'Tue Jun 04 2019': {
          'toDo': [5,6,7],
          'done': [5,6,7]
        }
      }
    },
    {
      'name': 'conversation in english',
      'description': '',
      'status': '',
      'color': '#00ff00',
      'popular': false,
      'date': {
        'Sun Jun 02 2019': {
          'toDo': [20,21,25,26,27],
          'done': [20,21,25,26,27]
        },
        'Mon Jun 03 2019': {
          'toDo': [26,27],
          'done': [26,27]
        },
        'Tue Jun 04 2019': {
          'toDo': [25,26,27],
          'done': [25,26,27]
        }
      }
    },
    {
      'name': 'creating react application',
      'description': '',
      'status': '',
      'color': '#0000ff',
      'popular': false,
      'date': {
        'Sun Jun 02 2019': {
          'toDo': [30,31,35,36,37],
          'done': [30,31,35,36,37]
        },
        'Mon Jun 03 2019': {
          'toDo': [36,37],
          'done': [36,37]
        },
        'Tue Jun 04 2019': {
          'toDo': [35,36,37],
          'done': [35,36,37]
        }
      }
    },
    {
      'name': 'Resting and relaxing',
      'color': '#ff00ff',
      'popular': true,
      'date': {}
    },
    {
      'name': 'physical training',
      'color': '#00ffff',
      'popular': true,
      'date': {}
    }
  ],
  currentTaskName: '',
  currentDate: new Date().toString().split(' ').splice(0, 4).join(' '),
  modalStatus: 'closed',
  editedTaskName: '',

};

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case 'CHANGE_DATE':
      return {
        ...state,
        currentDate: action.payload
      };
      break;
    case 'SAVE_EDITED_TASK':
      return {
        ...state,
        tasks: state.tasks.map((item) => state.editedTaskName === item.name ? action.payload : item),
        editedTaskName: '',
        currentTaskName: action.payload.name,
        modalStatus: 'closed'
      };
      break;
    case 'EDIT_TASK':
      return {
        ...state,
        editedTaskName: action.payload,
        modalStatus: 'edit'
      };
      break;
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        currentTaskName: action.payload.name,
        modalStatus: 'closed'
      };
      break;
    case 'SET_MODAL_STATUS':
      return {
        ...state,
        modalStatus: action.payload
      };
      break;
    case 'REMOVE_FROM_POPULAR':
      return {
        ...state,
        tasks: state.tasks.map((item) => item.name === action.payload ? {...item, popular: false} : item)
      };
      break;
    case 'ADD_TO_POPULAR':
      return {
        ...state,
        tasks: state.tasks.map((item) => item.name === action.payload ? {...item, popular: true} : item)
      };
      break;
    case 'UPDATE_TASK_COLOR':
      return {
        ...state,
        tasks: state.tasks.map((item) => item.name === action.payload.name ? {...item, color: action.payload.color} : item)
      };
      break;
    case 'CHOOSE_TASK':
      return {
        ...state,
        currentTaskName: action.payload
      };
      break;
    case 'UPDATE_TASKS':
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if(item.name === action.payload.currentTask.name) {
            return action.payload.currentTask
          } else if (action.payload.previousTask && item.name === action.payload.previousTask.name) {
            return action.payload.previousTask;
          } else {
            return item;
          }
        }),
        currentTaskName: action.payload.currentTask.name
      };
      break;
    default :
      return {
        ...state
      };
  }
};


export default rootReducer;