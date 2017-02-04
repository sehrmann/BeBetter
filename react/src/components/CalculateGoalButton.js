import React from 'react'

const CalculateGoalButton = props => {
  let handleCalculateGoal = () => {
    fetch(`/api/v1/users/${props.currentUser.id}/update_points_goal`, {
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
      .then(() => { props.getUserData(); })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return(
    <button
      className="button"
      onClick={handleCalculateGoal}
    >
      {'Calculate Goal'}
    </button>
  )
}

export default CalculateGoalButton;
