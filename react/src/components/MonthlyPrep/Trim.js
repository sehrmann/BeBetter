import React from 'react';
import TrimTaskListContainer from './TrimTaskListContainer';
import TaskFormButton from '../TaskForm/TaskFormButton';

const Trim = props => {
  let goToAddTasks = () => {
    $('#trim').foundation('close');
    $('#add-tasks').foundation('open');
  }

  return(
    <div
      className="reveal"
      id="trim"
      data-reveal
      data-close-on-click="false"
      data-close-on-esc="false"
    >
      <h1>{"Edit or Remove Tasks"}</h1>
      < TrimTaskListContainer />
      < TaskFormButton
        className = "button float-right"
        onClick = { goToAddTasks }
        buttonText = "Done"
      />
    </div>
  )
}

export default Trim;
