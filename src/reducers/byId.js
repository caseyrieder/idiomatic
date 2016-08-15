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

// export as default
export default byId;
// export named serlector to pick the state of the byId reducer
export const getTodo = (state, id) => state[id];
