// import combineReducers to combines ids & isFetching into single object
import { combineReducers } from 'redux';
// create new fxn that takes filter as arg & returns the relevant todos form 'RECEIVE_TODOS'
// -->this returns a reducer (state shape is an array of todo ids, based on the filter)
const createList = (filter) => {
  // rename this to ensure that THIS reducer only deals with state.ids, not the entire state (which now includes an isFetching boolean)
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    // return odo ids from receiveTodos actioncreator, based on the filter that is passed to createList
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  // add isFetching reducer to handle getIsFetching boolean, based on REQUEST_TODOS actioncreator
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
  });
};

export default createList;
// add callback API to gather all ids in the current state
// // rather than assume that state is simply an array of ids, lets assume that state is an object that include to array of todos.ids as a property:
export const getIds = (state) => state.ids;
// add boolean to determine if we are currently fetching data...this boolean is part of the state object
export const getIsFetching = (state) => state.isFetching;
