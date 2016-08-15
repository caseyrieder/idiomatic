//import a couple useful things here
import { combineReducers } from 'redux';
// remove todo reducer b/c itll be implemented as AI call later
// import todo from './todo';
// rename todo=> byId, state = {}
// ADD_TODO & TOGGLE_TODO logic now the same==> because it will call the 'todo' reducer to figure out the difference
// NOW, update this to handle to RECEIVE_TODOS response
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      // create shallow copy of state object (which corresponds to the lookup table)
      const nextState = { ...state };
      // for every todo in the response, take it & put it into the next version of the lookup table
      // replace that todo id with the new todo id we just fetched
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};
// rename todos => allIds
// will also call the 'todo' reducer file to figure out how to respond
// ./state of THIS reducer is an array of IDs, not an arrayof todos

// this will now simply fetch all todo ids from api
const allIds = (state = [], action) => {
  // ensure that the action filter (which is passed as part of the RECEIVE_TODOS action creator) is 'all'
  if (action.filter !== 'all') {
    return state;
  }
  // return all todo ids form receiveTodos actioncreator
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
// this will fetch all activeIds (as above, filtered)
const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
// this will fetch all completedIds (as above, filtered)
const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
// new combined reducer returns all ids for each filter
const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

// combine the byId & allIds reducers
const todos = combineReducers({
  byId,
  // rename:
  // allIds,
  idsByFilter,
});

export default todos;

// Since we're gonna grab stuff from server, we wont have access to all todos--get rid getAllTodos
// // // Handle new shit, return all todos in the current state
// // const getAllTodos = (state) =>
// //   state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
/* REMOVE THIS B/C WE'RE GONNA USE THE LIST OF TODOS PROVIDED BY THE SERVER (WHICH HAS ALREDY FILTERD THEM */
  // const allTodos = getAllTodos(state);
  // switch (filter) {
  //   case 'all':
  //     return allTodos;
  //   case 'completed':
  //     return allTodos.filter(t => t.completed);
  //   case 'active':
  //     return allTodos.filter(t => !t.completed);
  //   default:
  //     throw new Error(`Unknown filter: ${filter}`);
  // }
  // THIS SELETOR expects idsByFilter & byId to be parts of the combined state.todos object (todos reducer)
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};
