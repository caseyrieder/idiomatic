// replace nextTodoId with node-uuid so that each todo has a unique id & state refreshes dont reset the todo.id to "0"
import { v4 } from 'node-uuid';
// make all api fxns available to action creators
import * as api from '../api';
// add receiveTodos that will pull todos from api to be displayed in VisibleTodoList (or wherever)
// accepts server response & filter as args & returns an object of type: RECEIVE_TODOS, filter & response
// remove 'export' because components will now use fetchTodos to run this code block
const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

// requestTodos action to make a new API call
// dont export it anymore b/c we chain it to fetchTodos via thunk
const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});

// add async ation creator is an api call that resolves to the receiveTodos aciton crteator, which THEN resolves to an action object
// NOW, reather than returning promise, return a fxn that accepts a dispatch callback argument...this lets me call back dispatch anytime I want during the async operation
export const fetchTodos = (filter) => (dispatch) => {
  // dispatch the requestTodos aciton in the beginning...
  dispatch(requestTodos(filter));
  // ...when promise resolves, explicitly dispatch another receiveTodos action at the end
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};
//^ that will require a thunk (chaining callbacks after promises)

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

// no long need setVisibilityFilter action creator, because reactRouter.Link (in FilterLink) will handle it
