import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './button';
import FunctionButton from './functionButton';
import SlideButton from './slideButton';
import SelectButton from './selectButton';
import { withKnobs, select } from '@storybook/addon-knobs';



storiesOf('Atoms/Buttons/Button', module)
  .addDecorator(withKnobs)
  .add('Primary', () => {
    const label = 'Colors';
    const options = {
      Red: 'red',
      Blue: 'blue',
      Yellow: 'yellow',
    };
    const defaultValue = 'red';
    const groupId = 'GROUP-ID1';

    const value = select(label, options, defaultValue, groupId);
    return <Button color={value}>Save</Button>
  })
  .add('Red', () => <Button red>Change color</Button>);



storiesOf('Atoms/Buttons/SelectButton', module)
  .addDecorator(withKnobs)
  .add('Active', () => {
    const label = 'color';
    const options = {
      red: 'red',
      black: 'green',
      yellow: 'yellow'
    };
    const defaultValue = 'red';
    const value = select(label, options, defaultValue);
    return <SelectButton active={true} color={value}>task 1</SelectButton>
  })
  .add('No Active', () => {
    const label = 'color';
    const options = {
      red: 'red',
      black: 'green',
      yellow: 'yellow'
    };
    const defaultValue = 'red';
    const value = select(label, options, defaultValue);
    return <SelectButton active={false} color={value}>task 2</SelectButton>
  });


storiesOf('Atoms/Buttons/FunctionButton', module)
  .add('addToPopular', () => <FunctionButton type="addToPopular"/>)
  .add('edit', () => <FunctionButton type="edit"/>)
  .add('removeFromPopular', () => <FunctionButton type="removeFromPopular"/>);


storiesOf('Atoms/Buttons/SlideButton', module)
  .add('Left', () => <SlideButton left callBack={(e) => alert('left')}/>)
  .add('Right', () => <SlideButton right callBack={(e) => alert('left')}/>);