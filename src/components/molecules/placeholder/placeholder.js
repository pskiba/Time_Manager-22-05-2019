import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import setToolTipAct from '../../../_redux/actions/setToolTipAct';

const Placeholder = (WrappedComponent) => {
	return (props) => {
		const { setToolTipAct, title, description} = props;
		const handleMouseOver = (e) => {
			const BCR = e.target.getBoundingClientRect();
			
			setToolTipAct({on: true, title: title, description: description, pX: BCR.left, pY: BCR.top });
		};
		const handleMouseOut = () => {
			setToolTipAct({on: false, title: '', description: ''});
		};
		
		return (
			<>
				{
					props.title ?
					<span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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

export default compose(connect(null, mapDispatchToProps),Placeholder);
