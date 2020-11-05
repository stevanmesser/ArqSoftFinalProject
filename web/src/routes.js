import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '~/local/auth';
import Login from './pages/login';
import User from './pages/user';
import Event from './pages/event';

export default function Routes() {
  const [logado] = useState(isAuthenticated());

  return (
    <Route>
      {logado ? (
        <Switch>
          <Route exact path="/events" component={Event} />
          <Route exact path="/user" component={User} />
          <Redirect to={{ pathname: '/events' }} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={User} />
          <Redirect to={{ pathname: '/login' }} />
        </Switch>
      )}
    </Route>
  );
}
