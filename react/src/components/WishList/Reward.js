import React, { Component } from 'react';

class Reward extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      image: null,
      price: null,
      url: null
    }
  }

  getRewardData() {
    let data = {
      reward: {
        asin: this.props.asin
      }
    }
    let jsonStringData = JSON.stringify(data);
    fetch(`/api/v1/rewards/amazon_lookup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: jsonStringData
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
      .then(response => response.json())
      .then(body => {
        let newTitle = body.title;
        let newImage = body.image;
        let newPrice = body.price;
        let newUrl = body.url;
        this.setState({
          title: newTitle,
          image: newImage,
          price: newPrice,
          url: newUrl
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getRewardData();
  }

  render() {
    return(
      <div className="callout primary small-12 medium-6 large-4 columns">
        <div className="row">
          <p><a href={this.state.url}>{this.state.title}</a></p>
        </div>
        <div className="row">
          <div className="small-6 columns">
            <img src={this.state.image} />
          </div>
          <div className="small-6 columns">
            <p>{this.state.price}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Reward;
