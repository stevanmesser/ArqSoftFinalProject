import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Routes() {
  return (
    <Route>
      {/* {logado ? (
        <Switch>
          <Route exact path="/events" component={Event} />
          <Route exact path="/user" component={User} />
          <Redirect to={{ pathname: '/events' }} />
        </Switch>
      ) : ( */}
      <Switch>
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/user" component={User} /> */}
        <Redirect to={{ pathname: '/checkin' }} />
      </Switch>
      {/* )} */}
    </Route>
  );
}
