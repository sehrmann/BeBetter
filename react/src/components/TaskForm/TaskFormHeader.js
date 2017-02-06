import React from 'react';

const TaskFormHeader = props => {
  let subheader;
  if (props.subheader) {
    subheader = <p>{props.subheader}</p>
  }

  return(
    <div>
      <h3>{props.formHeader}</h3>
      {subheader}
    </div>
  )
}

export default TaskFormHeader;
