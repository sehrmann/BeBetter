import React from 'react';

const TaskFormSubmitButton = props => {
  return(
    <input
      type="submit"
      value={props.formButtonText}
      className="button"
    />
  )
}

export default TaskFormSubmitButton;
