import React, { PropTypes } from 'react'
import { Provider } from 'react-redux';
// import react router (browserHistory ensures clean routes/urls)
import { Router, Route, browserHistory } form 'react-router';
import App from './App';

// refactored
const Root = ({ store }) -> (
  <Provider store={store}>
    <Router history={browserHistory}>
      {/* add "{:filter}" to allow urls to match the filter, but the () mean that it is optional */}
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

// enable PropTypes validation
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
