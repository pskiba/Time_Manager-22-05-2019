import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select} from '@storybook/addon-knobs';
import SelectButton from './selectButton';

storiesOf('Atoms/SelectButton', module)
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