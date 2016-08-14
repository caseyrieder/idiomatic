import { createStore } from 'redux'
import reducers from './reducers'
/*REMOVE LOCALSTORAGE & PERSISTENCE STUFF*/
// import { loadState, saveState } from './localStorage'; // localstorage state-persisting fxn
// import throttle from 'lodash/throttle'; // control timing & frequency of localstorage.state saving

// wrap dispatch to log the action
const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const configureStore = () => {
/*REMOVE LOCALSTORAGE & PERSISTENCE STUFF*/
  // use LocalStorage browser API to handle persistent state
  // const persistedState = loadState();

  // create Store
  const store = createStore(reducers);

  // add some console.logs to the dispatch (only in dev)
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
/*REMOVE LOCALSTORAGE & PERSISTENCE STUFF*/
  // save state to localStorage.state whenever store changes
  // but lets just save the data, not the UI (todos, not filter)
  // // user throttle to control frequency of state-saving
  // store.subscribe(throttle(() => {
  //   saveState({
  //     todos: store.getState().todos,
  //   });
  // }, 1000));

  return store;
};

export default configureStore;
