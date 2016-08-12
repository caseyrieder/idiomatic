import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './components/App';
import { loadState, saveState } from './localStorage'; // localstorage state-persisting fxn
import { throttle } from 'lodash/throttle'; // control timing & frequency of localstorage.state saving

// use LocalStorage browser API to handle persistent state
const persistedState = loadState();
// create Store with persisted state
const store = createStore(
  reducers,
  persistedState
);

// save state to localStorage.state whenever store changes
// but lets just save the data, not the UI (todos, not filter)
// // user throttle to control frequency of state-saving
store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos,
  });
}, 1000));

// since nextTodoId always resets: "npm install --save node-uuid"
// then install lodash to THROTTLE the localStorage.state saving

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
