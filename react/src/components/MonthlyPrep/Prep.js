import React from 'react';
import TaskFormButton from '../TaskForm/TaskFormButton';

const Prep = props => {
  let goToTrim = () => {
    props.changeWalkthroughStep("Trim");
  }

  let clearTasks = () => {
    fetch(`/api/v1/users/${props.currentUser.id}/clear_tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin'
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
      .then(() => { props.changeWalkthroughStep("AddTasks"); })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <div className="custom-modal-overlay">
      <div
        className="callout custom-modal"
        id="prep"
      >
        <h1>{"Would you like to import last month's tasks?"}</h1>
        <p>{"You will be able to add or remove tasks after importing"}</p>
        <div>
          < TaskFormButton
            className = "button"
            buttonText = "Yes"
            onClick = { goToTrim }
          />
          < TaskFormButton
            className = "alert button"
            buttonText = "No"
            onClick = { clearTasks }
          />
        </div>
      </div>
    </div>
  )
}

export default Prep;
