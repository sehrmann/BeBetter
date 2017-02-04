import React from 'react';
import CalculateGoalButton from '../CalculateGoalButton';
import TaskFormButton from '../TaskForm/TaskFormButton';

const MonthlyGoal = props => {
  let goToDashboard = () => {
    $('#monthly-goal').foundation('close');
  }

  return(
    <div
      className="reveal"
      id="monthly-goal"
      data-reveal
      data-close-on-click="false"
      data-close-on-esc="false"
    >
      <h1>{"Now let's calculate your points goal for this month"}</h1>
      < CalculateGoalButton
        currentUser = { props.currentUser }
        getUserData = { props.getUserData }
      />
      < TaskFormButton
        className = "button float-right"
        buttonText = "Done"
        onClick = { goToDashboard }
      />
    </div>
  )
}

export default MonthlyGoal;
