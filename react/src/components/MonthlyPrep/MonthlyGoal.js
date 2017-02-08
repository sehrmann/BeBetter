import React from 'react';
import CalculateGoalButton from '../CalculateGoalButton';
import TaskFormButton from '../TaskForm/TaskFormButton';

const MonthlyGoal = props => {
  let goToDashboard = () => {
    props.changeWalkthroughStep(null);
  }

  let currentGoal, doneButton;
  if (props.currentUser) {
    if (props.currentUser.points_goal != 0) {
      currentGoal = <div>
        <p>{`Your goal for this month is: ${props.currentUser.points_goal}pts`}</p>
        <p>{"You can do it!"}</p>
      </div>
      doneButton = < TaskFormButton
        className = "button float-right"
        buttonText = "Done"
        onClick = { goToDashboard }
      />
    }
  }

  return(
    <div className="custom-modal-overlay">
      <div
        className="callout custom-modal"
        id="monthly-goal"
      >
        <h1>{"Calculate Goal"}</h1>
        <p>{"Now let's calculate your points goal for this month"}</p>
        <br></br>
        {currentGoal}
        < CalculateGoalButton
          currentUser = { props.currentUser }
          getUserData = { props.getUserData }
        />
        {doneButton}
      </div>
    </div>
  )
}

export default MonthlyGoal;
