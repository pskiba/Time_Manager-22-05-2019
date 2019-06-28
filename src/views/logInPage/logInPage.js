import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import AuthTemplate from '../../templates/authTemplate/authTemplate';
import logInAct from '../../_redux/actions/logInAct';
import {Redirect} from 'react-router-dom';
import {routes} from '../../routes';

const LogInPage = (props) => {
  const {logInAct, loginStatus} = props;
  if(loginStatus === 'log in') {
    // setTimeout(() => {
    //   props.history.push(routes.home);
    // },1000);

    return <Redirect to={routes.home}/>
  }
  const logIn = (data) => {
    logInAct(data);
  };
  return (
    <AuthTemplate title="Log in" callBack={logIn}/>
  )
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInAct: (data) => logInAct(dispatch, data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);