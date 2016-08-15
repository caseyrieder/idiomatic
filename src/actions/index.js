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

// add async ation creator is an api call that resolves to the receiveTodos aciton crteator, which THEN resolves to an action object
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  );

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
