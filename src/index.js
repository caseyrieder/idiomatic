import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import Root from './components/Root';
import configureStore from './configureStore'; // refactored

/*
import { fetchTodos } from './api'; // import the fake backend

Remove fake backend here, b/c we wanna fetchTodos from inside the component */
// // use fake backend to seed & log data
// // // this should ensure that the fetchTodos promise resolves to an array of todos
// fetchTodos('all').then(todos =>
// 	console.log(todos)
// );

// run the configureStore fxn to create it
const store = configureStore();
// refactor to put Provider into components/Root component
render(
  <Root store={store} />,
  document.getElementById('root')
);
