import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from '../../routes';
import HomePage from '../homePage/homePage';
import MainTemplate from '../../templates/mainTemplate/mainTemplate';

const Root = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Route exact path={routes.home} component={HomePage} />
      </MainTemplate>
    </BrowserRouter>
  )
};

export default Root;