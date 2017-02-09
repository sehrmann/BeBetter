import React, { Component } from 'react';

class WishListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="row">
        <div className="small-2 text-right columns" onClick={this.props.toggleShowForm}>
          <button
            className="button"
          >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
            {' Add New'}
          </button>
        </div>
        <div className="small-10 columns">
          <h3>Rewards</h3>
        </div>
      </div>
    )
  }
}

export default WishListHeader;
