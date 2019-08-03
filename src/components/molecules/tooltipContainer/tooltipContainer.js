import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import setToolTipAct from '../../../_redux/actions/setToolTipAct';

const TooltipContainer = (WrappedComponent) => {
	return (props) => {
		const { setToolTipAct, title, description} = props;
		const setToolTip = (e) => {
			// e.stopPropagation();
			const BCR = e.target.getBoundingClientRect();
			
			setToolTipAct({on: true, title: title, description: description, pX: (BCR.left + (BCR.width / 2)), pY: BCR.top });
		};
		const closeToolTip = (e) => {
			// e.stopPropagation();
			setToolTipAct({on: false, title: '', description: ''});
		};
		
		return (
			<>
				{
					props.title ?
					<span onMouseEnter={setToolTip} onMouseLeave={closeToolTip} onMouseUp={closeToolTip}>
						{WrappedComponent(props)}
					</span> : WrappedComponent(props)
				}
			</>
		)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setToolTipAct: (data) => setToolTipAct(dispatch, data)
	};
};

export default compose(connect(null, mapDispatchToProps),TooltipContainer);
