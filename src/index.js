import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import Root from './components/Root';
import configureStore from './configureStore'; // refactored
import { fetchTodos } from './api'; // import the fake backend

// use fake backend to seed & log data
fetchTodos('all').then(todos =>
	console.log(todos)
);

// run the configureStore fxn to create it
const store = configureStore();
// refactor to put Provider into components/Root component
render(
  <Root store={store} />,
  document.getElementById('root')
);
