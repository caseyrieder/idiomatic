import { createStore } from 'redux'
import reducers from './reducers'
import { loadState, saveState } from './localStorage'; // localstorage state-persisting fxn
import throttle from 'lodash/throttle'; // control timing & frequency of localstorage.state saving

const configureStore = () => {
  // use LocalStorage browser API to handle persistent state
  const persistedState = loadState();
  // create Store with persisted state
  const store = createStore(
    reducers,
    persistedState
  );
  // save state to localStorage.state whenever store changes
  // but lets just save the data, not the UI (todos, not filter)
  // // user throttle to control frequency of state-saving
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));

  return store;
};

export default configureStore;
