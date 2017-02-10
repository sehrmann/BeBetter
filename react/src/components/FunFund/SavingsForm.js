import React, { Component } from 'react';

class SavingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saveAmt: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSavings = this.updateSavings.bind(this);
  }

  handleChange(event) {
    let newSaveAmt = event.target.value;
    this.setState({ saveAmt: newSaveAmt });
  }

  handleSubmit(event) {
    event.preventDefault();
    let currentSavings = parseFloat(this.props.currentUser.savings);
    let saveAmt = parseFloat(this.state.saveAmt);
    let newSavings = currentSavings + saveAmt;
    let data = {
      user: {
        savings: newSavings
      }
    }
    let jsonStringData = JSON.stringify(data);
    this.updateSavings(jsonStringData);
  }

  updateSavings(data) {
    fetch(`/api/v1/users/${this.props.currentUser.id}`, {
      method: 'PUT',
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
      .then(() => { this.props.getUserData(); })
      .then(() => {
        let newSaveAmt = 0;
        this.setState({ saveAmt: newSaveAmt });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-label">{'$'}</span>
          <input
            className="input-group-field"
            name="saveAmt"
            type="number"
            value={this.state.saveAmt}
            onChange={this.handleChange}
          />
          <div className="input-group-button">
            <input
            type="submit"
            value="Submit"
            className="button"
            />
          </div>
        </div>
      </form>
    )
  }
}

export default SavingsForm;
