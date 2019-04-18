import React, { Component } from 'react';
import deleteBtn from './delete.png';

class CompletedItem extends Component {
  constructor(props) {
    super(props);
    this.handleRecover = this.handleRecover.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleRecover() {
    this.props.recover(this.props.index);
  }
  
  handleDelete() {
    this.props.delete(this.props.index);
  }

  render() {
    const { content } = this.props;
    return (
      <li className='items cplt'>
        <div id='cpltItems' onClick={this.handleRecover}>{content}</div>
        <button id='dlt' onClick={this.handleDelete}><img id='dltBtn' src={deleteBtn} alt='delete' /></button>
      </li>
    )
  }
}

export default CompletedItem;