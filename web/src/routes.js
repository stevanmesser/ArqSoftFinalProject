import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '~/local/auth';
import { getUserLS, reloadUser } from '~/local/user';
import Login from './pages/login';
import User from './pages/user';
import Event from './pages/event';

export default function Routes() {
  const [logado, setLogado] = useState();

  useEffect(() => {
    async function load() {
      await reloadUser();

      if (getUserLS) {
        setLogado(true);
      }
    }
    if (isAuthenticated()) {
      load();
    }
  }, []);

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
