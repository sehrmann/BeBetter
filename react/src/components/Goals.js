import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  daysInMonth() {
    let today = new Date;
    switch(today.getMonth()) {
      case 3: case 5: case 8: case 10:
        return(30);
      case 0: case 2: case 4: case 6: case 7: case 9: case 11:
        return(31);
      case 1:
        return((new Date(today.getFullYear(), 1, 29).getMonth() == 1) ? 29 : 28);
    }
  }

  daysLeftInMonth() {
    return(this.daysInMonth() - new Date().getDate())
  }

  calculatePercentage() {
    let percentage = 100*this.props.current/this.props.goal;
    return(percentage > 100 ? 100 : percentage)
  }

  render() {
    let progressBar;
    if (this.props.currentUser) {
      progressBar = < ProgressBar
        current = { this.props.currentUser.current_points }
        goal = { this.props.currentUser.points_goal }
        unit = "pts"
        className = "goal-progress-bar"
      />
    }
    return(
      <div className="small-10 columns">
        { progressBar }
      </div>
    )
  }
}

export default Goals;
