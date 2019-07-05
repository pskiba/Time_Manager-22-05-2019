import React from 'react';
import {connect} from 'react-redux';
import AuthTemplate from '../../templates/authTemplate/authTemplate';
import logInAct from '../../_redux/actions/logInAct';
import {Redirect} from 'react-router-dom';
import {routes} from '../../routes';

const LogInPage = ({logInAct, loginStatus}) => {
	
	if(loginStatus === 'log in') {
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);