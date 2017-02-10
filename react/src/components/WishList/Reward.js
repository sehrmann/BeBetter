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

    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    if (confirm("Are you sure?")) {
      fetch(`/api/v1/rewards/${this.props.id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
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
          this.props.getRewards();
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  componentDidMount() {
    this.getRewardData();
  }

  render() {
    let title
    if (this.state.title) {
      title = this.state.title;
      if (title.length > 20) {
        title = title.substring(0,20) + "...";
      }
    }

    let className = "small-12 medium-6 large-4 columns";
    if (this.props.last) {
      className = className + " end";
    }

    return(
      <div className={className}>
        <div className="callout primary">
          <div className="row">
            <div className="small-4 columns">
              <img src={this.state.image} />
            </div>
            <div className="small-8 columns">
              <p><a href={this.state.url}>{title}</a></p>
              <p>{this.state.price}</p>
            </div>
          </div>
          <button className="close-button" onClick={this.handleDelete}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Reward;
