import React from 'react';
import TaskFormButton from '../TaskForm/TaskFormButton';

const Welcome = props => {
  let goToAddTasks = () => {
    props.changeWalkthroughStep("AddTasks");
  }

  return(
    <div className="custom-modal-overlay">
      <div
        className="callout custom-modal"
        id="welcome"
      >
        <h1>{"Welcome to BeBetter!"}</h1>
        <p>{"It looks like you don't have any tasks for this month. Let's get started!"}</p>
        < TaskFormButton
          className = "button float-right"
          buttonText = "Continue"
          onClick = { goToAddTasks }
        />
      </div>
    </div>
  )
}

export default Welcome;
