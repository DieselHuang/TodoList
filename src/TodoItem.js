import React, { Component } from 'react';
import deleteBtn from './delete.png';

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
      <li className='todoItem'>
        <div className='items'>
          <div id='cpltBtn' onClick={this.handleComplete}></div>
          {/* <div 
            id='content' 
            hidden={this.state.isEdit} 
            onDoubleClick={this.handleEdit}
          >
            {content}
          </div> */}
          <div 
            dangerouslySetInnerHTML={{__html: content}}
            id='content' 
            hidden={this.state.isEdit} 
            onDoubleClick={this.handleEdit}
          />
          <button id='dlt' onClick={this.handleDelete}><img id='dltBtn' src={deleteBtn} alt='delete' /></button>
        </div>
        <input 
          id='edit'
          hidden={!this.state.isEdit}
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