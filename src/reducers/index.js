import { combineReducers } from 'redux';
// import gertVisibleTodos, but with this syntax
import todos, * as fromTodos from './todos';
// delete because we dont need it, since its handled by the router with paths
// import visibilityFilter from './visibilityFilter';

const reducers = combineReducers({
  todos,
  // visibilityFilter,
});

export default reducers;

// add the selector UI fxn from ./todos.js
// // this vsersion responds to the state of the combineReducers obj
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
