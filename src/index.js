import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import configureStore from './configureStore'; // refactored
import Root from './components/Root';

// run the configureStore fxn to create it
const store = configureStore();

// refactor to put Provider into components/Root component
render(
  <Root store={store} />,
  document.getElementById('root')
);
