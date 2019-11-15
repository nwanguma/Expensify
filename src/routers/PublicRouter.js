import { Route, Redirect } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { connect } from 'react-redux';
import React from 'react';

export const PublicRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRouter);