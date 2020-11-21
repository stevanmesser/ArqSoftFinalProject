import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Checkin from './pages/checkin';

export default function Routes() {
  return (
    <Route>
      <Switch>
        <Route exact path="/checkin" component={Checkin} />
        <Redirect to={{ pathname: '/checkin' }} />
      </Switch>
    </Route>
  );
}
