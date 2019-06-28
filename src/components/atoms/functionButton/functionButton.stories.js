import React from 'react';
import { storiesOf } from '@storybook/react';
import FunctionButton from './functionButton';

storiesOf('Atoms/FunctionButton', module)
  .add('addToPopular', () => <FunctionButton type="addToPopular"/>)
  .add('edit', () => <FunctionButton type="edit"/>)
  .add('removeFromPopular', () => <FunctionButton type="removeFromPopular"/>)