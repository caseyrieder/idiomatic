import { connect } from 'react-redux'
// going to read params individually now
import { withRouter } from 'react-router'; //withRouter inject reoute-relat4ed props (like params)
import { toggleTodo } from '../actions'
import TodoList from './TodoList'
// import getVisibleTodos from rootReducer
import { getVisibleTodos } from '../reducers'

// move getVisibleTodos into todos reducer

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});
// // if ( prop(args) === action(args) )...simplify
// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

// withRouter will inject route params (filter prop) into VisibleTodoList
// simplify mapDispatchToProps b/c args === args
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;
