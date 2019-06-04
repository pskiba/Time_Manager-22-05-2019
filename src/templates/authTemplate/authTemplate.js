import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Input from '../../components/atoms/input/input';
import Label from '../../components/atoms/label/label';
import Button from '../../components/atoms/button/button';
import Heading from '../../components/atoms/heading/heading';
import Paragraph from '../../components/atoms/paragraph/paragraph';
import { routes } from '../../routes';

const StyledWrapper = styled.div`
  position: relative;
  width: 920px;
  margin: 0 auto;
`;

const StyledHeading = styled(Heading)`
 text-align: center;
`;

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

const StyledParagraph = styled(Paragraph)`
  text-align: center;
`;

class AuthTemplate extends React.Component {

  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.callBack(this.state);
  };

  render() {
    const {title} = this.props;
    return(
      <StyledWrapper>
        <StyledHeading>{title}</StyledHeading>
        {title === 'Log in' && <StyledParagraph>If you do not have an account, <Link to={routes.register}>register</Link></StyledParagraph>}
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledRow>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <Input id="email" type="email" onChange={this.handleChange}/>
          </StyledRow>
          <StyledRow>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <Input type="password" id="password" onChange={this.handleChange}/>
          </StyledRow>
          <StyledRow>
            <Button>Log in</Button>
          </StyledRow>
        </StyledForm>
      </StyledWrapper>
    )
  }
}

export default AuthTemplate