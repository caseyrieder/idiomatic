import { connect } from 'react-redux';
// going to read params individually now
import { withRouter } from 'react-router'; //withRouter inject reoute-relat4ed props (like params)
// import receiveTodos to enable action-creation
// // reduce boilerplate
import * as actions from '../actions';
import TodoList from './TodoList';
// import getVisibleTodos & getIsFetching from rootReducer
import { getVisibleTodos, getIsFetching } from '../reducers';
/* currently, fetchTodos is inside the componentDidMount lifecycle group (takes place after mounting). BUT, since we can't override the lifecycle fxns form generated components (i.e., TodoList) we need to create a new React Component to handle the fetchTodos call ---> */
import React, { Component } from 'react';

// so, define the VisibleTodoList component
// THE ONLY PURPOSE FOR ADDING THIS COMPONENT IS TO ADD THE LIFECYCLE GROUPS
class VisibleTodoList extends Component {
  // now, define componentDidMount lifecycle group to handle fetchTodos call to grab todos for current filter & log them (upon the Promise resolving)
  componentDidMount(){
    this.fetchData();
  }
  // since componentDidMount only runs once (upon mounting)  clicking on the filters doesn't yet change the actual filter (as we can see in the console). So...we add componentDidUpdate to rerender the component when each filter button is clicked
  // if prev<> current filter, rerun fetchTodos & log
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  // combine common componentDidMount/Update code
  /* we want fetchTodos to become part of redux store state, and the ONLY way to get something into the state is to dispatch an action */
    // this will pass the filter through the action creator (these props are available via mapState & mapDispatch...)
  // simplify, now that fetchTodos is defined in '/actions/index'
  fetchData() {
    // add requestTodos action as a prop
    const { filter, fetchTodos } = this.props;
    // call requestTodos before start the asyn operation with request todos
    // requestTodos(filter);
    // // BUT!!, we never wanna fire requestTodos & fetchTodos separately, so how to we chain them?...THUNKS!
    fetchTodos(filter);
  }
  // define render method to render TodoList, as before

  render() {
    // destructure props b/c toggleTodo needs to be passed by onTodoClick callback prop name
    // also need a list of todos & value of isFetching bool
    const { toggleTodo, todos, isFetching } = this.props;
    // show the user that a fetch is occurring
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    // pass toggleTodo as action for onTodoClick prop, but the other props as themselves
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

// make current filter available as a prop (for componentDidMount...fetchTodos)--
// calculate filter from params & pass both filter & todos into props as part of the state object
// add isFetching here
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};
// // if ( prop(args) === action(args) )...simplify
// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

// withRouter will inject route params (filter prop) into VisibleTodoList
// simplify mapDispatchToProps b/c args === args
// NO NEED FOR const B/C DEFINED AS CLASS. RENAME TO (VisibleTodoList) because now THAT will have the props that the Component will pass down to TodoList
// // add receiveTodos as an action to the mapDispatchToProps so that this component can dispatch the receiveTodos action
// reduce boilerplate by adding 'actions' from named import at top
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
