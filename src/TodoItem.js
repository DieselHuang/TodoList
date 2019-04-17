import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      isEdit: false,
      value: '',
      isEsc: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.itemEditDone = this.itemEditDone.bind(this);
  }
  
  handleComplete() {
    this.props.complete(this.props.index);
  }

  handleDelete() {
    this.props.delete(this.props.index);
  }

  handleEdit() {
    this.setState({
      isEdit: true,
      value: this.props.content
    }, () => {
      this.refs.editInput.focus()
    });
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.setState({
        isEdit: false,
        isEsc: true
      });
      return;
    } 
    if (e.keyCode !== 13) {
      return;
    }

    this.itemEditDone();
  }

  handleBlur() {
    if (this.state.isEsc) {
      this.setState({
        isEsc: false
      })
    } else {
      this.itemEditDone();
    }
  }

  itemEditDone() {
    this.setState({
      isEdit: false
    })
    this.props.done(this.state.value, this.props.index);
  }
  
  render() {
    const {content} = this.props;
    return (
      <li>
        <div>
          <div onClick={this.handleComplete}>O</div>
          <div onDoubleClick={this.handleEdit}>{content}</div>
          <button onClick={this.handleDelete}>x</button>
        </div>
        <input 
          value={this.props.value}
          ref='editInput'
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
      </li>
    )
  }
}

export default TodoItem;