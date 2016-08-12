//import a couple useful things here
import { combineReducers } from 'redux';
import todo from './todo';
// rename todo=> byId, state = {}
// ADD_TODO & TOGGLE_TODO logic now the same==> because it will call the 'todo' reducer to figure out the difference
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};
// rename todos => allIds
// will also call the 'todo' reducer file to figure out how to respond
// ./state of THIS reducer is an array of IDs, not an arrayof todos

const allIds = (state = [], action) => {
  switch (action.type) {
      // just add the new todo.id to the array of ids
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};
// combine the byId & allIds reducers
const todos = combineReducers({
  byId,
  allIds,
});

export default todos;

// Handle new shit, return all todos in the current state
const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'active':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};
