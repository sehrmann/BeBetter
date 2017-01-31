import React, { Component } from 'react';
import Sidebar from './Sidebar';
import TaskList from './TaskList';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="expanded row">
        < Sidebar />
        < TaskList />
      </div>
    )
  }
}

export default Dashboard;
