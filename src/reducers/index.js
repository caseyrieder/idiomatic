//import a couple useful things here
import { combineReducers } from 'redux';
// remove todo reducer b/c itll be implemented as AI call later
// import todo from './todo';
// EXTRACT byId reducer into separate file, then import it, along with the getTodo named selector
import byId, * as fromById from './byId';
// import createList fxn to generate todo ids list, plus named exports
import createList, * as fromList from './createList';
// rename todos => allIds
// will also call the 'todo' reducer file to figure out how to respond
// ./state of THIS reducer is an array of IDs, not an arrayof todos

// // create new fxn that takes filter as arg & returns the relevant todos form 'RECEIVE_TODOS'
// // -->this returns a reducer (state shape is an array of todo ids, based on the filter)
// const createList = (filter) => {
//   return (state = [], action) => {
//     if (action.filter !== filter) {
//       return state;
//     }
//     // return odo ids from receiveTodos actioncreator, based on the filter that is passed to createList
//     switch (action.type) {
//       case 'RECEIVE_TODOS':
//         return action.response.map(todo => todo.id);
//       default:
//         return state;
//     }
//   };
// };

/*REMOVE ALLIDS, ACTIVEIDS, COMPLETED IDS REDUCERS & HANDLE THEM DIRECTLY IN THE COMBINEREDUCERS OBJECT BELOW VIA CREATELIST METHOD*/
// // this will now simply fetch all todo ids from api
// const allIds = (state = [], action) => {
//   // ensure that the action filter (which is passed as part of the RECEIVE_TODOS action creator) is 'all'
//   if (action.filter !== 'all') {
//     return state;
//   }
//   // return all todo ids form receiveTodos actioncreator
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo => todo.id);
//     default:
//       return state;
//   }
// };
// // this will fetch all activeIds (as above, filtered)
// const activeIds = (state = [], action) => {
//   if (action.filter !== 'active') {
//     return state;
//   }
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo => todo.id);
//     default:
//       return state;
//   }
// };
// // this will fetch all completedIds (as above, filtered)
// const completedIds = (state = [], action) => {
//   if (action.filter !== 'completed') {
//     return state;
//   }
//   switch (action.type) {
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo => todo.id);
//     default:
//       return state;
//   }
// };
// new combined reducer returns all ids for each filter
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

// combine the byId & allIds reducers
const todos = combineReducers({
  byId,
  // rename:
  // allIds,
  listByFilter,
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
  // use getIds selector in createList.js to gather ids; use getTodo selector in byId.js to map them
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
  // ^ lets us change the state shape of any reducer in the future, without having to change the whole code base
};

// add boolean export to determine if we are fetching data or not (to display 'loading...' message)
// pass the state of the list, which we get by 'state.listByFilter' ==. all/active/completed
export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

// handle errors
export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
