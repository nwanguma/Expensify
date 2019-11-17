import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => {
  return (
    <div className="login-container">
      <div className="login__btn-box">
        <h1 className="login__heading--primary">Expensify</h1>
        <p className="login__heading--secondary">Tracking your expenses like it's 1999.</p>
        <button onClick={startLogin} className="btn btn--login">Sign in with Google</button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);