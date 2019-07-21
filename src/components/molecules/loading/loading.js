import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LoadingGif from '../../../assets/giphy.gif';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.2);
`;

const Loading = ({responseWaiting}) => {
  return (
  	<>
			{
				responseWaiting &&
				<StyledWrapper>
					<img src={LoadingGif} alt="loading"/>
				</StyledWrapper>
			}
		</>
  )
};

const mapStateToProps = (state) => {
	return {
		responseWaiting: state.responseWaiting
	}
};

export default connect(mapStateToProps)(Loading);

