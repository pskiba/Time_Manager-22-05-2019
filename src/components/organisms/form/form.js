import React from 'react';
import styled from 'styled-components';
import Input from "../../atoms/input/input";
import Button from "../../atoms/button/button";
import Label from "../../atoms/label/label";
import CheckMarkIcon from "../../../assets/checkmarkIcon.svg";
import EditIconIcon from "../../../assets/editIcon.svg";
import TrashIcon from "../../../assets/trashIcon.svg";

const TYPE_KEYS = {
  'LogIn': {
    inputs: ['email', 'password']
  },
  'Register': {
    inputs: ['email', 'password']
  },
  'Modal': {
    inputs: ['title', 'descriptions']
  },
};

const StyledForm = styled.form`
  max-width: 500px;
  margin: 30px auto;
`;

const StyledRow = styled.div`
  padding-bottom: 15px;
`;

const StyledLabel = styled(Label)`
  padding: 0 0 5px 8px;
`;


const Form = ({handleChange, handleSubmit, type}) => {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledRow>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Input id="email" type="email" onChange={handleChange}/>
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <Input type="password" id="password" onChange={handleChange}/>
      </StyledRow>
      <StyledRow>
        <Button>Log in</Button>
      </StyledRow>
    </StyledForm>
  )
};

export default Form;