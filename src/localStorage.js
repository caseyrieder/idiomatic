// enable localstorage to load persistent state
export const loadState = () => {
  try {
    // get state form localStorage
    const serializedState = localStorage.getItem('state');
    // if state isn't there, allow reducers to handle initial state
    if (serializedState === null ) {
      return undefined;
    }
    // state state IS there, parse the string into the state object
    return JSON.parse(serializedState);
  } catch (err) {
    // handle errors by allowing default state from reducers
    return undefined;
  }
};

// enable localStorage to save state for persistence
export const saveState = (state) => {
  try {
    // serialize the state object into a string
    const serializedState = JSON.stringify(state);
    // assign stringified state to localStorage
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // handle errors...localStorage'state' SHOULD be serializable, which is why this should work
    // Ignore write errors, but this catch prevents the app from crashing
  }
};
