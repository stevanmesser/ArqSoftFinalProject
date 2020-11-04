import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login'

export default function Routes() {
  return (
    <Route>
      <Switch>
        <Route exact path='login' component={Login}></Route>
      </Switch>
    </Route>
  )
}