// replace nextTodoId with node-uuid so that each todo has a unique id & state refreshes dont reset the todo.id to "0"
import { v4 } from 'node-uuid';
// make all api fxns available to action creators
import * as api from '../api';
// import getIsFetching reducer to enable action chaining
import { getIsFetching } from '../reducers';
// requestTodos action to make a new API call
// dont export it anymore b/c we chain it to fetchTodos via thunk
// Now, embed the requestTodos object into the fetchTodos action
// const requestTodos = (filter) => ({
//   type: 'REQUEST_TODOS',
//   filter,
// });

// add receiveTodos that will pull todos from api to be displayed in VisibleTodoList (or wherever)
// accepts server response & filter as args & returns an object of type: RECEIVE_TODOS, filter & response
// remove 'export' because components will now use fetchTodos to run this code block
// const receiveTodos = (filter, response) => ({
//   type: 'RECEIVE_TODOS',
//   filter,
//   response,
// });


// add async ation creator is an api call that resolves to the receiveTodos aciton crteator, which THEN resolves to an action object
// NOW, reather than returning promise, return a fxn that accepts a dispatch callback argument...this lets me call back dispatch anytime I want during the async operation
// enable the chaining of getIsFetching to the fetchTodos action
export const fetchTodos = (filter) => (dispatch, getState) => {
  // handle if we are currently fetching data...if so, exit this thunk early without dispatching any actions. Since thunk returns a promise, this Promise.resolve() will simply exit this method
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  // dispatch the requestTodos aciton in the beginning...
  // ...by embedding the requestTodos object here
  // rename 'REQUEST_TODOS' as 'FETCH_TODOS_REQUEST'
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });
  // ...when promise resolves, explicitly dispatch another receiveTodos action at the end...
  // ...& embed the receiveTodos action here
  // rename 'RECEIVE_TODOS' as 'FETCH_TODOS_SUCCESS'
  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    // handle error
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong',
      })
    }
  );
};
//^ that will require a thunk (chaining callbacks after promises)

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
