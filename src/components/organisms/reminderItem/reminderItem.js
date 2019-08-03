import React from 'react';
import styled, { css } from 'styled-components';
import Input from '../../atoms/input/input';
import Row from '../../atoms/row/row';
import Select from '../../atoms/select/select';
import Label from '../../atoms/label/label';
import QuantityButton from '../../atoms/buttons/quantityButton';

const StyledWrapper = styled.div`
	padding-top: 16px;
	border-bottom: 1px solid ${({theme}) => theme.color.darkgray};
`;

const StyledItem = styled.div`
	display: inline-block;
	position: relative;
	margin: 0 5px;
	font-size: ${({theme}) => theme.fontSize.s};
	${({min}) => min && css`
		&:after {
			left: 39px;
			top: 3px;
			padding: 1px;
			position: absolute;
			display: inline-block;
			content: 'min';
		}`
	}
`;

const StyledLabel = styled(Label)`
	position: absolute;
	top: -20px;
	padding-left: 1px;
	font-size: ${({theme}) => theme.fontSize.s};
`;

const StyledInput = styled(Input)`
	position: relative;
	z-index: 2;
	padding: 0 2px 0 2px;
	height: 20px;
	line-height: 20px;
	background: none;
	font-size: ${({theme}) => theme.fontSize.s};
`;

const StyledInputRep = styled(StyledInput)`
	width: 36px;
`;

const StyledInputMessage = styled(StyledInput)`
	width: 210px;
`;

class ReminderItem extends React.Component {
	
	state = {
		tStart: this.props.tStart,
		gap:  this.props.gap,
		voice: this.props.voice,
		repeat: this.props.repeat,
		hour: this.props.hour,
		minute: this.props.minute,
		message: this.props.message,
		id: this.props.id
	};
	
	handleChange = (e) => {
		let value = e.target.selectedIndex ? e.target.selectedIndex : e.target.value;
		value = e.target.name !== 'message' ? Number(value) : value;
		console.log(e.target.name);
		console.log(value);
		this.setState({
			[e.target.name]: value
		});
	};
	
	play = (e) => {
		e.preventDefault();
		const {voice, message} = this.state;
		const {voices} = this.props;
		const speechText = new SpeechSynthesisUtterance(message);
		speechText.voice = voices[voice];
		window.speechSynthesis.speak(speechText);
	};
	
	update = () => {
		this.props.update(this.state);
	};
	
	render() {
		const {type, id, voices, removeItem, disabled} = this.props;
		const {tStart, gap, voice, repeat, hour, minute, message} = this.state;
		return (
			<StyledWrapper>
				<Row>
					<StyledItem>
						<StyledLabel htmlFor={'voice' + id}>Voice</StyledLabel>
						<Select disabled={disabled} name="voice" id={'voice' + id} onChange={this.handleChange}>
							{
								voices.map((item, index) => {
									return (
										<option key={String(Math.random() + index)} selected={index === voice} data-number={index} data-lang={item.lang} data-name={item.name}>{item.name}</option>
									)
								})
							}
						</Select>
					</StyledItem>
					{
						type === 'interval' &&
						<>
							<StyledItem min="true">
								<StyledLabel htmlFor={'tStart' + id}>T. Start</StyledLabel>
								<StyledInput disabled={disabled} name="tStart" defaultValue={tStart} type="number" min="0" max="1440" id={'tStart' + id} onChange={this.handleChange}/>
							</StyledItem>
							< StyledItem min="true">
								<StyledLabel htmlFor={'interval' + id}>Gap</StyledLabel>
								<StyledInput disabled={disabled} name="gap" defaultValue={gap} type="number" min="1" max="1440" id={'interval' + id} onChange={this.handleChange} />
							</StyledItem>
						</>
					}
					{
						type === 'single' &&
						<>
							<StyledItem>
								<StyledLabel htmlFor={'hour' + id}>Hour</StyledLabel>
								<StyledInput disabled={disabled} name="hour" defaultValue={hour} type="number" min="0" max="23" id={'hour' + id} onChange={this.handleChange}/>
							</StyledItem>
							< StyledItem>
								<StyledLabel htmlFor={'minute' + id}>Minute</StyledLabel>
								<StyledInput disabled={disabled} name="minute" defaultValue={minute} type="number" min="0" max="59" id={'minute' + id} onChange={this.handleChange} />
							</StyledItem>
						</>
					}
					<StyledItem>
						<StyledLabel htmlFor={'repetition' + id}>Rep.</StyledLabel>
						<StyledInputRep disabled={disabled} name="repeat" defaultValue={repeat} type="number" min="1" max="20" id={'repetition' + id} onChange={this.handleChange} />
					</StyledItem>
					<StyledItem>
						<StyledLabel htmlFor={'message' + id}>Message</StyledLabel>
						<StyledInputMessage disabled={disabled} name="message" id={'message' + id} type="text" small={true} defaultValue={message} onChange={this.handleChange} />
					</StyledItem>
					<StyledItem>
						<QuantityButton disabled={disabled} onClick={this.play}>&#9835;</QuantityButton>
					</StyledItem>
					<StyledItem>
						<QuantityButton disabled={disabled} onClick={this.update}>&#10003;</QuantityButton>
					</StyledItem>
					<StyledItem>
						<QuantityButton disabled={disabled} onClick={() => removeItem(id)}>-</QuantityButton>
					</StyledItem>
				</Row>
			</StyledWrapper>
		)
	}
}

export default ReminderItem;