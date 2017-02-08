import React from 'react';

const TrimTask = props => {
  return(
    <div className="callout">
      <p>
        {props.name}
        <button
          className="button float-right"
          onClick={props.handleFormClick}
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
      </p>
    </div>
  )
}

export default TrimTask
