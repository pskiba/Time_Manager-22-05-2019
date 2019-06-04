import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from '../../routes';
import MainTemplate from '../../templates/mainTemplate/mainTemplate';
import HomePage from '../homePage/homePage';
import LogInPage from '../logInPage/logInPage';
import RegistrationPage from '../registrationPage/registrationPage';


const Root = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.logIn} component={LogInPage} />
        <Route path={routes.register} component={RegistrationPage}/>
      </MainTemplate>
    </BrowserRouter>
  )
};

export default Root;