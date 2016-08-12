let nextTodo = 0;

// remove duplicate blocks & replace with ()wrawpped object expression b/c it only returns a returnn statement
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: (nextTodo++).toString(),
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
