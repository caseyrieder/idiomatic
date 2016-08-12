import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'

// params comes from react Router, & lets us use filter in path
const App = ({ params }) => (
  <div>
    <AddTodo />
    {/* inject filter as prop for filter-path-based routing...all is the fallback-->useful for post-refresh */}
    <VisibleTodoList
      filter={params.filter || 'all'}
    />
    <Footer />
  </div>
);

export default App;
