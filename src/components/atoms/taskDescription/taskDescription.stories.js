import React from 'react';
import { storiesOf } from '@storybook/react';
import TaskDescription from './taskDescription';

storiesOf('Atoms/TaskDescription', module)
  .add('Normal', () => <TaskDescription>TaskDescription</TaskDescription>);