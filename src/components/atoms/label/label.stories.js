import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Label from './label';

storiesOf('Atoms/Label', module)
  .addDecorator(withKnobs)
  .add('Normal', () => {
    const label = 'color';
    const options = {
      red: 'red',
      black: 'black',
      yellow: 'yellow'
    };
    const defaultValue = 'red';
    const value = select(label, options, defaultValue, value);
    return <Label color={value}>Label</Label>
  })