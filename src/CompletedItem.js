import React, { Component } from 'react';

class CompletedItem extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>{content}</div>
    )
  }
}

export default CompletedItem;