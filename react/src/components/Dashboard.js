import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Goals from './Goals';
import TaskList from './TaskList';
import Welcome from './MonthlyPrep/Welcome';
import Summary from './MonthlyPrep/Summary';
import Prep from './MonthlyPrep/Prep';
import Trim from './MonthlyPrep/Trim';
import AddTasks from './MonthlyPrep/AddTasks';
import MonthlyGoal from './MonthlyPrep/MonthlyGoal';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      hasTasks: true,
      newMonth: false,
      walkthroughStep: null
    }

    this.getUserData = this.getUserData.bind(this);
    this.changeWalkthroughStep = this.changeWalkthroughStep.bind(this);
  }

  getUserData(checkForWalkthrough) {
    checkForWalkthrough = (typeof checkForWalkthrough !== 'undefined') ? checkForWalkthrough : true;
    fetch(`/api/v1/users/fetch_current_user`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newCurrentUser = body.user;
      this.setState({ currentUser: newCurrentUser });
      return body;
    })
    .then((body) => {
      if (checkForWalkthrough) {
        let newHasTasks = body.hasTasks;
        let newNewMonth = body.newMonth;
        let newWalkthroughStep = null;
        if (!newHasTasks) {
          newWalkthroughStep = "Welcome";
        } else if (newNewMonth) {
          newWalkthroughStep = "Summary";
        }
        this.setState({
          hasTasks: newHasTasks,
          newMonth: newNewMonth,
          walkthroughStep: newWalkthroughStep
        });
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  changeWalkthroughStep(newStep) {
    let newWalkthroughStep = newStep;
    this.setState({ walkthroughStep: newWalkthroughStep });
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    let walkthroughContent;
    let getUserData = () => {
      this.getUserData(false);
    }
    switch(this.state.walkthroughStep) {
      case "Welcome":
        walkthroughContent = < Welcome
          changeWalkthroughStep = { this.changeWalkthroughStep }
        />
        break;
      case "Summary":
        walkthroughContent = < Summary
          currentUser = { this.state.currentUser }
          getUserData = { getUserData }
        />
        break;
      case "Prep":
        walkthroughContent = < Prep
          currentUser = { this.state.currentUser }
          getUserData = { getUserData }
        />
        break;
      case "Trim":
       walkthroughContent = < Trim />
       break;
      case "AddTasks":
        walkthroughContent = < AddTasks
          changeWalkthroughStep = { this.changeWalkthroughStep }
        />
        break;
      case "MonthlyGoal":
        walkthroughContent = < MonthlyGoal
          changeWalkthroughStep = { this.changeWalkthroughStep }
          currentUser = { this.state.currentUser }
          getUserData = { getUserData }
        />
        break;
    }

    return(
      <div className="expanded row">
        < Sidebar />
        < Goals
          currentUser = { this.state.currentUser }
        />
        {walkthroughContent}
        < TaskList
          currentUser = { this.state.currentUser }
          getUserData = { this.getUserData }
        />
      </div>
    )
  }
}

export default Dashboard;
