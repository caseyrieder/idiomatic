import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type='submit'>
          Add Todo
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// by default, 'connet()' injects the dispatch prop
// /adding mapState/Dispatch to props lets you add props from state or dispatch
// // since dispatch here doesnt do anything based on a prop, we can just user 'connect()(AddTodo)'--whereas with the FilterLink, the dispatch needed to act based on the 'filter' prop sent to it by the Footer component (its parent) [<FilterLink filter="SHOW_XXX">]...so in that case:
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter))
//     }
//   };
// };
export default connect()(AddTodo);
