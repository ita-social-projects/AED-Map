import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, permission, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      (permission === true)
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/' }} />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  permission: PropTypes.bool.isRequired
};

export default PrivateRoute;
