// add middleware handler
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import reducers from './reducers';
/*REMOVE LOCALSTORAGE & PERSISTENCE STUFF*/
// import { loadState, saveState } from './localStorage'; // localstorage state-persisting fxn
// import throttle from 'lodash/throttle'; // control timing & frequency of localstorage.state saving

// wrap dispatch (next) to log the action
// // rename
// rewrite this line to enable middleware-wrapping---middleare becomes a fxn (addLogging...), that returns a fxn (next), that returns a fxn (action)
// const next = store.dispatch;
// REDUX-LOGGER DOES THIS SHIT
// const logger = (store) => (next) =>
//   if (!console.group) {
//     return next;
//   }
//
//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: gray', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnValue = rawDispatch(action);
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   };
// };

// add Promise support (takes store & returns version of dispatch that will accept promises)
// rewrite to enable middleware-wrapping
// // // rename
// since arrow fxns can have expressions as their bodies (so: => {return (next) =>...} becomes => (next) => ), lets clean this up:
// REDUX-PROMISE DOES THIS SHIT
// const promise = (store) => (next) => (action) => {
//   // if action is a promise (has .then method) as opposed to a 'real' ation (returns an object)...return the then-rawDispatch (next) once that promise resolves
//   if (typeof action.then === 'function') {
//     return action.then(next);
//   }
//   // otherwise, call rawDispatch(next) right away
//   return next(action);
// };

// create middleare-wrapping function to wrap store, as well as the next middleware later
// // add slice.reverse to handle the order of middleware propagation
// applyMiddleware from 'redux' now handles this stuff
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// };

const configureStore = () => {
/*REMOVE LOCALSTORAGE & PERSISTENCE STUFF*/
  // use LocalStorage browser API to handle persistent state
  // const persistedState = loadState();

  // reather than overriding public api for dispatch, we add middleware array to append functions to dispatch
  // // initialize with 'promise' to ensure that it is the first MW through which the action propagates
  const middlewares = [promise];
  // add some console.logs to the dispatch (only in dev)
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  // create Store after specifying the middleware
  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
