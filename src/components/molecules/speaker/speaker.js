import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/input/input';
import Row from  '../../atoms/row/row'
import Button from '../../atoms/buttons/button';
import Select from '../../atoms/select/select';
import Label from '../../atoms/label/label';
import QuantityButton from '../../atoms/buttons/quantityButton';

const StyledInputWrapper = styled.span`
	display: inline-block;
  width: 80px;
  height: 16px;
  margin-right: 10px;
  position: relative;
  
  &:after {
  	left: 40px;
  	padding: 1px;
  	position: absolute;
  	display: inline-block;
  	content: 'min';
  }
`;

const StyledInput = styled(Input)`
	position: absolute;
	z-index: 2;
	padding: 2px;
	background: none;
`;


const StyledMargin = styled.span`
	margin: 0 5px;
`;

const Speaker = ({intervalValue, key}) => {
	
	const synth = window.speechSynthesis;
	const voicesSelect = React.createRef();
	const speechInput = React.createRef();
	
	const play = (e) => {
		e.preventDefault();
		const selectOption = voicesSelect.current.selectedOptions[0].getAttribute('data-name');
		const speechText = new SpeechSynthesisUtterance(speechInput.current.value);
		speechText.voice = synth.getVoices().find((item) => item.name === selectOption);
		synth.speak(speechText);
		
	};
	
	return (
		<>
			<Row>
				<Select ref={voicesSelect}>
					{
						synth.getVoices().map((item) => {
							return (
								<option data-lang={item.lang} data-name={item.name}>{item.name}</option>
							)
						})
					}
				</Select>
				<StyledMargin>
					<Input type="text" small={true} ref={speechInput} defaultValue="hello world"/>
				</StyledMargin>
				<Button onClick={play}>Check</Button>
			</Row>
			<Row>
				<Label htmlFor={'tStart' + key}>Time start</Label>
				<StyledInputWrapper>
					<StyledInput defaultValue="0" type="number" min="1" max="1440" id={'tStart' + key}/>
				</StyledInputWrapper>
				<Label htmlFor={'interval' + key}>Interval</Label>
				<StyledInputWrapper>
					<StyledInput defaultValue="10" type="number" min="1" max="1440" id={'interval' + key}/>
				</StyledInputWrapper>
				<StyledMargin>
					<QuantityButton>-</QuantityButton>
				</StyledMargin>
			</Row>
		</>
	)
};

export default Speaker;