import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { theme } from '../../theme/mainTheme';
import GlobalStyled from '../../theme/globalStyle';
import SideBar from '../../components/organisms/sidebar/sidebar';
import downloadDataAct from '../../_redux/actions/downloadDataAct';
import Loading from '../../components/molecules/loading/loading';

class MainTemplate extends React.Component {
	
  componentDidMount() {
    if(sessionStorage.getItem('userId') && this.props.beforeUploadData) {
      this.props.downloadDataAct();
    }
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
    downloadDataAct: () => downloadDataAct(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
