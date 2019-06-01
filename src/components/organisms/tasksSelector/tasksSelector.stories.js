import React from 'react';
import { storiesOf } from '@storybook/react';
import TasksSelector from './tasksSelector';
import { withKnobs, boolean } from '@storybook/addon-knobs';

storiesOf('TasksSelector', module)
  .addDecorator(withKnobs)
  .add('All tasks', () => {
    const label = 'Active';
    const defaultValue = false;
    const groupId = 'GROUP-ID1';
    const value = boolean(label, defaultValue, groupId);
    return <TasksSelector active={value} type="allTasks"/>
  })
  .add('Popular tasks', () => {
    const label = 'Active';
    const defaultValue = false;
    const groupId = 'GROUP-ID1';
    const value = boolean(label, defaultValue, groupId);
    return <TasksSelector active={value} type="allTasks"/>
  });