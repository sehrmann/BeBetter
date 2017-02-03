import React from 'react';

const TaskFormButton = props => {
  return(
    <button
      className={props.className}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  )
}

export default TaskFormButton;
