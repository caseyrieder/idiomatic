// create new fxn that takes filter as arg & returns the relevant todos form 'RECEIVE_TODOS'
// -->this returns a reducer (state shape is an array of todo ids, based on the filter)
const createList = (filter) => {
  return (state = [], action) => {
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
};

export default createList;
// add callback API
export const getIds = (state) => state;
