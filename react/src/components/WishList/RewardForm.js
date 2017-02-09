import React, { Component } from 'react';
import TaskFormHeader from '../TaskForm/TaskFormHeader';
import RewardFormFieldsContainer from './RewardFormFieldsContainer';

class RewardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asin: "",
      errors: []
    }

    this.onChange = this.onChange.bind(this);
    this.postReward = this.postReward.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    let newAsin = event.target.value;
    this.setState({ asin: newAsin });
  }

  checkForErrors() {
    let errors = [];
    let asin = this.state.asin;

    if (!asin || asin.length != 10) {
      errors.push("Please enter a 10-character ASIN (Amazon Standard Identification Number)");
    }
    return errors;
  }

  postReward(data) {
    fetch(`/api/v1/rewards`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(() => {
        if (this.props.closeOnSubmit) {
          this.props.handleCloseForm();
          this.props.getRewards();
        } else {
          let newErrors = [];
          let newAsin = "";
          this.setState({
            asin: newAsin,
            errors: newErrors
          });
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.checkForErrors().length == 0) {
      let data = {
        reward: {
          asin: this.state.asin
        }
      }
      let jsonStringData = JSON.stringify(data);
      this.postReward(jsonStringData);
    } else {
      let newErrors = this.checkForErrors();
      this.setState({ errors: newErrors });
    }
  }

  makeErrors() {
    let ii=0;
    if (this.state.errors.length > 0) {
      let errorFragment = this.state.errors.map((error) => {
        ii++;
        return(
          <p key={ii}>{error}</p>
        )
      });
      return(
        <div className="callout alert">
          {errorFragment}
        </div>
      );
    } else {
      return(null);
    }
  }

  render() {
    let errors = this.makeErrors();

    let closeButton;
    if (this.props.closeOnClick) {
      closeButton = <button className="close-button" onClick={this.props.handleCloseForm}>
        <span aria-hidden="true">&times;</span>
      </button>
    }

    return(
      <div className="callout custom-modal">
        < TaskFormHeader
          formHeader = "Add a New Reward"
          subheader = "Please enter a 10-digit ASIN (Amazon Standard Identification Number)"
        />
        < RewardFormFieldsContainer
          onChange = { this.onChange }
          asin = { this.state.asin }
          handleSubmit = { this.handleSubmit }
          buttons = { this.props.buttons }
        />
        {closeButton}
        {errors}
      </div>
    )
  }
}

export default RewardForm;
