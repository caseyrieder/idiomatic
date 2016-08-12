import { connect } from 'react-redux'
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
const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    // refactor to enable ReactRouter.Link params
    ownProps.filter
  ),
});
// remove duplicate blocks & replace w/()wrawpped obj expression
// when fxn is defined inside an object, dont need the arrow
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
