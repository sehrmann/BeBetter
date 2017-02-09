import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  calculatePercentage() {
    let percentage = 100*this.props.current/this.props.goal;
    return(percentage > 100 ? 100 : percentage)
  }

  makeClassName() {
    let className = `progress ${this.props.className}`
    if (this.calculatePercentage() === 100) {
      className = `${className} success`;
    }
    return(className);
  }

  makeProgressText() {
    let progressText = null;
    if (this.calculatePercentage() > 5) {
      progressText = <p className="progress-meter-text">
        {`${this.props.current}${this.props.unit}`}
      </p>
    }
    return(progressText);
  }

  render() {
    let pct = this.calculatePercentage();
    let className = this.makeClassName();
    let progressText = this.makeProgressText();

    return(
      <div>
        <div
          className={className}
          role="progressbar"
          tabIndex="0"
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span className="progress-meter" style={ { width: `${pct}%` } }>
            {progressText}
          </span>
        </div>
        <h3 className="text-center">
          {`${parseInt(pct)}% to Monthly Goal!`}
        </h3>
      </div>
    )
  }
}

export default ProgressBar;
