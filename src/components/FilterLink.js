import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from './Link'

// remove duplicate blocks & replace w/()wrawpped obj expression
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

// remove duplicate blocks & replace w/()wrawpped obj expression
// when fxn is defined inside an object, dont need the arrow
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
