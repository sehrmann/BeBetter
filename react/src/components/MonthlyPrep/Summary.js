import React from 'react';
import TaskFormButton from '../TaskForm/TaskFormButton';

const Summary = props => {
  let goToPrep = () => {
    let data = {
      points_goal: 0,
      current_points: 0
    }
    let jsonStringData = JSON.stringify(data);
    fetch(`/api/v1/users/${props.currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: jsonStringData
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => { props.getUserData(false); })
      .then(() => { props.changeWalkthroughStep("Prep"); })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  let goalMet = () => {
    if (props.currentUser) {
      return(props.currentUser.points_goal < props.currentUser.current_points)
    }
  }

  let body;
  if (goalMet()) {
    body = <div>
      <h1>{"Congratulations!"}</h1>
      <p>{"You met your points goal last month!"}</p>
    </div>
  } else {
    body = <p>{"You didn't quite meet your goal this month. But that's okay!"}</p>
  }

  return(
    <div className="custom-modal-overlay">
      <div
        className="callout custom-modal"
        id="summary"
      >
        {body}
        <p>{"Let's get set up for next month."}</p>
        < TaskFormButton
          className = "button float-right"
          buttonText = "Continue"
          onClick = { goToPrep }
        />
      </div>
    </div>
  )
}

export default Summary;
