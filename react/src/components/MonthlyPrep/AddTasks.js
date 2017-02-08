import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskFormSubmitButton from '../TaskForm/TaskFormSubmitButton';
import TaskFormButton from '../TaskForm/TaskFormButton';

const AddTasks = props => {
  let goToMonthlyGoal = () => {
    props.changeWalkthroughStep("MonthlyGoal");
  }

  let doneButton = < TaskFormButton
    className = "button float-right"
    onClick = { goToMonthlyGoal }
    buttonText = "Done"
  />

  return(
    <div className="custom-modal-overlay">
      < TaskForm
        subheader = "Add some things you would like to do this month"
        closeOnSubmit = { false }
        buttons = { doneButton }
        closeOnClick = { false }
        id = "add-tasks"
      />
    </div>
  )
}

export default AddTasks
