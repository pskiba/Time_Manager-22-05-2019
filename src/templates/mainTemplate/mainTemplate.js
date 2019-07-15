import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import { theme } from '../../theme/mainTheme';
import GlobalStyled from '../../theme/globalStyle';
import SideBar from '../../components/organisms/sidebar/sidebar';
import Loading from '../../components/molecules/loading/loading';
import ToolTip from '../../components/molecules/toolTip/toolTip';

import downloadDataAct from '../../_redux/actions/downloadDataAct';
import setVoicesAct from '../../_redux/actions/setVoicesAct';


class MainTemplate extends React.Component {
	
  componentDidMount() {
  	const {downloadDataAct, setVoicesAct} = this.props;
    if(sessionStorage.getItem('userId') && this.props.beforeUploadData) {
      downloadDataAct();
    }
		window.speechSynthesis.onvoiceschanged = function() {
			setVoicesAct(window.speechSynthesis.getVoices());
		};
		
  
  }

  render() {
    const {children, responseWaiting} = this.props;
    return (
      <div>
        <GlobalStyled/>
        <ThemeProvider theme={theme}>
          <>
            {responseWaiting && <Loading/>}
            <SideBar/>
            {children}
          </>
        </ThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    beforeUploadData: state.beforeUploadData,
    responseWaiting: state.responseWaiting
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadDataAct: () => downloadDataAct(dispatch),
		setVoicesAct: (data) => setVoicesAct(dispatch, data)
		
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
