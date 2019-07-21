import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import IssueMassage from '../../atoms/issueMassage/issueMassage';
import setModalStatusAct from '../../../_redux/actions/setModalStatusAct';

const StyledModalWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.1);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalBody = styled.div`
  position: relative;
	animation: scaleAnim;
  animation-duration: 0.3s;
  margin-top: -100px;
  width: 60%;
  max-width: 700px;
  padding: 15px 30px 25px 30px;
  background: ${({theme}) => theme.color.white};
  border-radius: 5px;
  box-shadow: 0 0 20px 10px rgba(0,0,0,0.3);
`;

class NewModal extends React.Component {

  close = (e) => {
    if (e && e.target && e.target.id === 'modal-wrapper') {
      this.props.setModalStatusAct(null);
    }
  };

  render() {
    const {issueMessage, children} = this.props;
    return (
      <StyledModalWrapper onClick={this.close} id="modal-wrapper">
        <StyledModalBody>
          {issueMessage && <IssueMassage>{issueMessage}</IssueMassage>}
          {children}
        </StyledModalBody>
      </StyledModalWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    issueMessage: state.issueMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalStatusAct: (status) => setModalStatusAct(dispatch, status)
  }
};

NewModal.propTypes = {
  issueMessage: PropTypes.string,
  setModalStatusAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewModal);