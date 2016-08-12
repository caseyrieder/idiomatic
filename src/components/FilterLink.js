// total refactoring
import React from 'react'
import { Link } from 'react-router'

// use ReactRouter.Link to point to the filter path we want
// add children so that the parent component can specify the children:
/*
<FilterLink filter="all">
  All                     --> All is children
</FilterLink>
*/
const FilterLink = ({ filter, children }) => (
  <Link
    // filter=all --> root path...otherwise, use filter=>path
    to={filter === 'all' ? '' : filter}
    // define style for active link (when filter=current path)
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

export default FilterLink;
