import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../../templates/authTemplate/authTemplate';

const RegistrationPage = () => {
  const createUser = () => {

  };
  return (
    <AuthTemplate title="Registration" callBack={createUser}/>
  )

};

export default RegistrationPage;