import { connect } from 'react-redux'
// going to read params individually now
import { withRouter } from 'react-router'; //withRouter inject reoute-relat4ed props (like params)
import { toggleTodo } from '../actions'
import TodoList from './TodoList'

// rename cases to match new definitions in Footer
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};
// remove duplicate blocks & replace w/()wrawpped obj expression
// // read the filter prop from params
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});
// remove duplicate blocks & replace w/()wrawpped obj expression
// when fxn is defined inside an object, dont need the arrow
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

// withRouter will inject route params (filter prop) into VisibleTodoList
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
