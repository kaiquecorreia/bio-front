import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Course from '../pages/Course';
import Student from '../pages/Student';
import Enrolment from '../pages/Enrolment';
import Header from '../components/Header';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/course" component={Course} />
      <Route path="/student" component={Student} />
      <Route path="/" component={Enrolment} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
