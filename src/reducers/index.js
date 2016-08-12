import { combineReducers } from 'redux';
import todos from './todos';
// delete because we dont need it, since its handled by the router with paths
// import visibilityFilter from './visibilityFilter';

const reducers = combineReducers({
  todos,
  // visibilityFilter,
});

export default reducers;
