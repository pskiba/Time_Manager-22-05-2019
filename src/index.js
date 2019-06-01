import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/root/root';
import { createStore } from 'redux';
import rootReducer from './_redux/reducers/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
