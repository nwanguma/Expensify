import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRouter path="/" component={LoginPage} exact={true} />
        <PrivateRouter path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRouter path="/create" component={AddExpensePage} />
        <PrivateRouter path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
