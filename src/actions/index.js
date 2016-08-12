// replace nextTodoId with node-uuid so that each todo has a unique id & state refreshes dont reset the todo.id to "0"
import { v4 } from 'node-uuid';
// let nextTodo = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
