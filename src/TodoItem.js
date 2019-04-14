import React, { Component, Fragment} from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  
  handleComplete() {
    this.props.complete(this.props.index);
  }

  handleDelete() {
    this.props.delete(this.props.index);
  }
  
  render() {
    const {content} = this.props;
    return (
      <Fragment>
        <div onClick={this.handleComplete}>O</div>
        <div>{content}</div>
        <button onClick={this.handleDelete}>x</button>
      </Fragment>
    )
  }
}

export default TodoItem;