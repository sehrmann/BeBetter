import React, { Component } from 'react';
import TaskFormSubmitButton from '../TaskForm/TaskFormSubmitButton';

class RewardFormFieldsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          {"ASIN:"}
          <input
            name="asin"
            type="text"
            value={this.props.asin}
            onChange={this.props.onChange}
          />
        </label>
        < TaskFormSubmitButton
          formButtonText = "Submit"
        />
        {this.props.buttons}
      </form>
    )
  }
}

export default RewardFormFieldsContainer;
