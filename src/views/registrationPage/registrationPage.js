import React from 'react';
import {connect} from 'react-redux';
import AuthTemplate from '../../templates/authTemplate/authTemplate';
import registerAct from '../../_redux/actions/registerAct';
import {Redirect} from 'react-router-dom';
import clearRegisterStatusAct from '../../_redux/actions/clearRegisterStatusAct';
import {routes} from '../../routes';
import PropTypes from 'prop-types';

const RegistrationPage = ({registerAct, registerStatus, clearRegisterStatusAct}) => {
	
  if (registerStatus === 'user was register') {
    clearRegisterStatusAct();
    return <Redirect to={routes.logIn} />;
  }

  const createUser = (data) => {
    registerAct(data)
  };
  
  return (
    <AuthTemplate title="Registration" callBack={createUser}/>
  )
};

const mapStateToProps = (state) => {
  return {
    registerStatus: state.registerStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAct: (data) => registerAct(dispatch, data),
    clearRegisterStatusAct: () => clearRegisterStatusAct(dispatch)
  }
};

RegistrationPage.propTypes = {
  registerStatus: PropTypes.string,
  registerAct: PropTypes.func.isRequired,
  clearRegisterStatusAct: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);