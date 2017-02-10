import React, { Component } from 'react';

class WishListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="row">
        <div className="small-12 columns">
          <div className="row">
            <h3>Rewards</h3>
          </div>
          <div className="row">
            <button
              className="button"
              onClick={this.props.toggleShowForm}
            >
              <i className="fa fa-plus-square" aria-hidden="true"></i>
              {' Add New'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WishListHeader;
