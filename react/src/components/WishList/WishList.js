import React, { Component } from 'react';
import WishListHeader from './WishListHeader';
import Reward from './Reward';
import RewardForm from './RewardForm';

class WishList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rewards: [],
      showForm: false
    }

    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.getRewards = this.getRewards.bind(this);
  }

  toggleShowForm() {
    let newShowForm = !this.state.showForm;
    this.setState({ showForm: newShowForm });
  }

  getRewards() {
    fetch('/api/v1/rewards', {
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
        let newRewards = body;
        this.setState({
          rewards: newRewards
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getRewards();
  }

  render() {
    let rewards = this.state.rewards.map((reward) => {
      return(
        < Reward
          key = {reward.id}
          id = {reward.id}
          asin = {reward.asin}
          getRewards = { this.getRewards }
        />
      )
    });

    let form;
    if (this.state.showForm) {
      form = <div className="custom-modal-overlay">
        < RewardForm
          getRewards = { this.getRewards }
          closeOnSubmit = { true }
          closeOnClick = { true }
          handleCloseForm = { this.toggleShowForm }
        />
      </div>
    }

    return(
      <div className="small-10 columns">
        < WishListHeader
          toggleShowForm = { this.toggleShowForm }
        />
        { form }
        { rewards }
      </div>
    )
  }
}

export default WishList;
