import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './components/App';

// create persistent state to override initialStae values defined in reducers
const persistedState = {
  todos: [{
    id: '0',
    text: 'Welcome back',
    completed: false,
  }],
};
// create Store with persisted state
const store = createStore(
  reducers,
  persistedState
);
// log store once its created
console.log(store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
