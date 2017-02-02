import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="small-2 columns sidebar">
        <ul className="menu vertical">
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Rewards</a></li>
          <li><a href="#">Fun Fund</a></li>
        </ul>
      </div>
    )
  }
}

export default Sidebar;
