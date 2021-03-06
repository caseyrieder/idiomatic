// import combineReducers to combines ids & isFetching into single object
import { combineReducers } from 'redux';
// create new fxn that takes filter as arg & returns the relevant todos form 'RECEIVE_TODOS'
// -->this returns a reducer (state shape is an array of todo ids, based on the filter)
const createList = (filter) => {
  // rename this to ensure that THIS reducer only deals with state.ids, not the entire state (which now includes an isFetching boolean)

  // declare handleToggle fxn to handle TOGGLE_TODO_SUCCESS
  const handleToggle = (state, action) => {
    //destructure result for response as the id of the toggled todo, & the entities from within the response
    const { result: toggledId, entities } = action.response;
    // read completed value from toggled todo
    const { completed } = entities.todos[toggledId];
    // do i wanna remove the todo from the list?
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    );
    // if shouldRemove is true, return list without the toggled id, otherwise, return everything
    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state;
  };
  const ids = (state = [], action) => {
    // return odo ids from receiveTodos actioncreator, based on the filter that is passed to createList
    // rename RECEIVE_TODOS to FETCH_TODOS_SUCCESS
    switch (action.type) {
        // move filter checker into FETCH_TODOS_SUCCESS
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ?
          // change this because the response is ALREADY an array of ids
          action.response.result :
          state;
      // handle re-run after a successful addTodo
      // since this has no filter property, the top-level filter checker will fail
      // make the new todo show up in every non-completed filter (by default, they are incomplete)
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ?
          // change this b/c the response is already a single id
          [...state, action.response.result] :
          state;
      // imlpement immediate updating of completed v not completed todos on TOGGLE... action--via handleToggle fxn
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  // add isFetching reducer to handle getIsFetching boolean, based on REQUEST_TODOS actioncreator
  // rename RECEIVE_TODOS to FETCH_TODOS_SUCCESS, REQUEST_TODOS to FETCH_TODOS_REQUEST
  // add error handler
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  // handle errors with this reducer--return the action-creator's message if error happens
  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;
// add callback API to gather all ids in the current state
// // rather than assume that state is simply an array of ids, lets assume that state is an object that include to array of todos.ids as a property:
export const getIds = (state) => state.ids;
// add boolean to determine if we are currently fetching data...this boolean is part of the state object
export const getIsFetching = (state) => state.isFetching;
// add error message exporter
export const getErrorMessage = (state) => state.errorMessage;
