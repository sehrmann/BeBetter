import React from 'react';
import TaskFormButton from '../TaskForm/TaskFormButton';

const Welcome = props => {
  let goToAddTasks = () => {
    $('#welcome').foundation('close');
    $('#add-tasks').foundation('open');
  }

  return(
    <div
      className="reveal"
      id="welcome"
      data-reveal
      data-close-on-click="false"
      data-close-on-esc="false"
    >
      <h1>{"Welcome to BeBetter!"}</h1>
      <p>{"It looks like you don't have any tasks for this month. Let's get started!"}</p>
      < TaskFormButton
        className = "button float-right"
        buttonText = "Continue"
        onClick = { goToAddTasks }
      />
    </div>
  )
}

export default Welcome;
