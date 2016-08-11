let nextTodo = 0;

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: (nextTodo++).toString(),
    text,
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};
