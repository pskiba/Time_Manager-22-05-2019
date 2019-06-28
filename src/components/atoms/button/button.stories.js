import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './button';
import { withKnobs, select } from '@storybook/addon-knobs';



storiesOf('Atoms/Button', module)
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