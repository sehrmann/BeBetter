import React, { Component } from 'react';
import SavingsForm from './SavingsForm';

class FunFund extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let savings = this.props.currentUser.savings.toFixed(2);
    return(
      <div className="small-10 columns">
        <h3 className="text-center">{"Fun Fund"}</h3>
        <div className="row">
          <div className="small-centered small-10 large-6 columns">
            <div className="callout">
              <h4 className="text-center">{`Current savings: \$${savings}`}</h4>
              <br></br>
              <p>{'How much did you save today?'}</p>
              < SavingsForm
                currentUser = {this.props.currentUser}
                getUserData = {this.props.getUserData}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FunFund;
