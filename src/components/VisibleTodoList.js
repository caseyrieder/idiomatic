import { connect } from 'react-redux';
// going to read params individually now
import { withRouter } from 'react-router'; //withRouter inject reoute-relat4ed props (like params)
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
// import getVisibleTodos from rootReducer
import { getVisibleTodos } from '../reducers';
// fetch todos from api here
import { fetchTodos } from '../api';
/* currently, fetchTodos is inside the componentDidMount lifecycle group (takes place after mounting). BUT, since we can't override the lifecycle fxns form generated components (i.e., TodoList) we need to create a new React Component to handle the fetchTodos call ---> */
import React, { Component } from 'react';

// so, define the VisibleTodoList component
// THE ONLY PURPOSE FOR ADDING THIS COMPONENT IS TO ADD THE LIFECYCLE GROUPS
class VisibleTodoList extends Component {
  // now, define componentDidMount lifecycle group to handle fetchTodos call to grab todos for current filter & log them (upon the Promise resolving)
  componentDidMount(){
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
  // since componentDidMount only runs once (upon mounting)  clicking on the filters doesn't yet change the actual filter (as we can see in the console). So...we add componentDidUpdate to rerender the component when each filter button is clicked
  componentDidUpdate(prevProps) {
    // if prev<> current filter, rerun fetchTodos & log
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }
  // define render method to render TodoList, as before
  render() {
    return <TodoList {...this.props} />;
  }
}

// make current filter available as a prop (for componentDidMount...fetchTodos)--
// calculate filter from params & pass both filter & todos into props as part of the state object
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
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
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodoList));

export default VisibleTodoList;
