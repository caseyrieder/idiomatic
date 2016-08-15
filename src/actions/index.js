// replace nextTodoId with node-uuid so that each todo has a unique id & state refreshes dont reset the todo.id to "0"
import { v4 } from 'node-uuid';
// let nextTodo = 0;

// add receiveTodos that will pull todos from api to be displayed in VisibleTodoList (or wherever)
// accepts server response & filter as args & returns an object of type: RECEIVE_TODOS, filter & response
export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

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
