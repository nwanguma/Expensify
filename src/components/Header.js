import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
  <header className="header">
    <h1 className="header__heading">Expensify</h1>
    <nav className="header__nav">
      <NavLink to="/dashboard" activeClassName="is-active" className="header__nav__item header__nav__item--dashboard">Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active" className="header__nav__item header__nav__item--create">New Expense</NavLink>
      <button onClick={startLogout} className="btn btn--logout">Log out</button>
    </nav>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => { dispatch(startLogout()) }
})

export default connect(undefined, mapDispatchToProps)(Header);
