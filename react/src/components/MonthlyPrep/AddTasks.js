import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskFormSubmitButton from '../TaskForm/TaskFormSubmitButton';
import TaskFormButton from '../TaskForm/TaskFormButton';

const AddTasks = props => {
  let goToMonthlyGoal = () => {
    $('#add-tasks').foundation('close');
    $('#monthly-goal').foundation('open');
  }

  let submitButton = < TaskFormSubmitButton
    formButtonText = "Add"
  />

  let doneButton = < TaskFormButton
    className = "button float-right"
    onClick = { goToMonthlyGoal }
  />

  return(
    <div
      className="reveal"
      id="welcome"
      data-reveal
      data-close-on-click="false"
      data-close-on-esc="false"
    >
      <h1>{"Add some things you would like to do this month"}</h1>
    </div>
  )
}

export default AddTasks
