import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskFormSubmitButton from '../TaskForm/TaskFormSubmitButton';
import TaskFormButton from '../TaskForm/TaskFormButton';

const AddTasks = props => {
  let goToMonthlyGoal = () => {
    $('#add-tasks').foundation('close');
    $('#monthly-goal').foundation('open');
  }

  let doneButton = < TaskFormButton
    className = "button float-right"
    onClick = { goToMonthlyGoal }
    buttonText = "Done"
  />

  return(
    < TaskForm
      subheader = "Add some things you would like to do this month"
      closeOnSubmit = { false }
      buttons = { doneButton }
      closeOnClick = { false }
      closeOnEsc = { false }
      id = "add-tasks"
    />
  )
}

export default AddTasks
