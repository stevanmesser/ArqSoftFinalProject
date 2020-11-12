import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import User from './pages/user';
import Checkin from './pages/checkin';

export default function Routes() {
  return (
    <Route>
      <Switch>
        <Route exact path="/checkin" component={Checkin} />
        <Route exact path="/user" component={User} />
        <Redirect to={{ pathname: '/checkin' }} />
      </Switch>
    </Route>
  );
}
