const initState = {
  data: {
    'Sat Jun 01 2019': [
      {
        'name': 'reading in english',
        'toDo': [0,1,5,6,7],
        'done': [0,1,5,6,7],
        'color': '#ff0000',
        'popular': false
      },
      {
        'name': 'conversation in english',
        'toDo': [20,21,25,26,27],
        'done': [20,21,25,26,27],
        'color': '#00ff00',
        'popular': false
      },
      {
        'name': 'creating react application',
        'toDo': [30,31,35,36,37],
        'done': [30,31,35,36,37],
        'color': '#0000ff',
        'popular': false
      },
      {
        'name': 'Resting and relaxing',
        'toDo': [40,51,65],
        'done': [40,51,65],
        'color': '#ff00ff',
        'popular': true
      },
      {
        'name': 'physical training',
        'toDo': [66,67,68,69],
        'done': [66,67,68,69],
        'color': '#00ffff',
        'popular': true
      }
    ],
    'Sun Jun 02 2019': [
      {
        'name': 'reading in english',
        'toDo': [0,1,5,6,7],
        'done': [0,1,5,6,7],
        'color': '#ff0000',
        'popular': false
      },
      {
        'name': 'conversation in english',
        'toDo': [20,21,25,26,27],
        'done': [20,21,25,26,27],
        'color': '#00ff00',
        'popular': false
      },
      {
        'name': 'creating react application',
        'toDo': [30,31,35,36,37],
        'done': [30,31,35,36,37],
        'color': '#0000ff',
        'popular': false
      },
    ],
    'Mon Jun 03 2019': [
      {
        'name': 'Resting and relaxing',
        'toDo': [40,51,65],
        'done': [40,51,65],
        'color': '#ff00ff',
        'popular': true
      },
      {
        'name': 'physical training',
        'toDo': [66,67,68,69],
        'done': [66,67,68,69],
        'color': '#00ffff',
        'popular': true
      }
    ]
  },
  currentDate: new Date().toString().split(' ').splice(0, 4).join(' '),
  currentTaskName: 'reading in english',
  modalStatus: 'closed',
  editedTaskName: '',
};

initState.tasks = initState.data[initState.currentDate];

const rootReducer = (state = initState, action) => {
  switch(action.type) {

    case 'CHANGE_DATE':
      return {
        ...state,
        currentDate: action.payload,
        tasks: state.data[action.payload] ? state.data[action.payload] : []
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