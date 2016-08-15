// rename todo=> byId, state = {}
// ADD_TODO & TOGGLE_TODO logic now the same==> because it will call the 'todo' reducer to figure out the difference
// NOW, update this to handle to RECEIVE_TODOS response
// rename RECEIVE_TODOS to FETCH_TODOS_SUCCESS
//
// Letse normalizer the api call so that the response shape is always the same, rgardless of whether we are fetching an array of todos, or adding a single todo
const byId = (state = {}, action) => {
  // since response shape is now the same (due to normalizr), remove all of this BS
  ///// switch (action.type) {
  //   case 'FETCH_TODOS_SUCCESS':
  //     // create shallow copy of state object (which corresponds to the lookup table)
  //     const nextState = { ...state };
  //     // for every todo in the response, take it & put it into the next version of the lookup table
  //     // replace that todo id with the new todo id we just fetched
  //     action.response.forEach(todo => {
  //       nextState[todo.id] = todo;
  //     });
  //     return nextState;
  //   // if we have a successful addTodo, append the todo to the lookup table in state
  //   // But this doesnt update the listByFilter...yet
  //   case 'ADD_TODO_SUCCESS':
  //     return {
  //       ...state,
  //       [action.response.id]: action.response,
  //     }
  //   default:
  //     return state;
  // }
  // NOW, WE TREAT THESE BASED ON THE NORMALIZED REPSONSES FROM THE ACTION CREATORS
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};

// export as default
export default byId;
// export named serlector to pick the state of the byId reducer
export const getTodo = (state, id) => state[id];
