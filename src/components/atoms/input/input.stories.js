import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Input from './input';

storiesOf('Atoms/Input', module)
  .addDecorator(withKnobs)
  .add('Text', () => {
    const label = 'id';
    const options = {
      id1: 'id-1',
      id2: 'id-2',
      id3: 'id-3',
    };
    const defaultValue = 'id-1';
    const groupId = 'GROUP-ID1';
    const value = select(label, options, defaultValue, groupId);

    return <Input type="text" id={value}/>
  })
  .add('Password', () => {
    const label = 'id';
    const options = {
      id1: 'id-1',
      id2: 'id-2',
      id3: 'id-3',
    };
    const defaultValue = 'id-1';
    const groupId = 'GROUP-ID1';
    const value = select(label, options, defaultValue, groupId);
    return <Input type="password" id={value}/>
  } )
  .add('email', () => {
    const label = 'id';
    const options = {
      id1: 'id-1',
      id2: 'id-2',
      id3: 'id-3',
    };
    const defaultValue = 'id-1';
    const groupId = 'GROUP-ID1';
    const value = select(label, options, defaultValue, groupId);
    return <Input type="email" id={value}/>
  });