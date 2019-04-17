import React, { Component } from 'react';

class CompletedItem extends Component {
  constructor(props) {
    super(props);
    this.handleRecover = this.handleRecover.bind(this)
  }

  handleRecover() {
    this.props.recover(this.props.index);
  }

  render() {
    const { content } = this.props;
    return (
      <li onClick={this.handleRecover}>{content}</li>
    )
  }
}

export default CompletedItem;