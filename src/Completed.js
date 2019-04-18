import React, { Component, Fragment } from 'react';
import CompletedItem from './CompletedItem'

class Completed extends Component {
  constructor(props) {
    super(props);

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleRecover = this.handleRecover.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleClearCompleted() {
    this.props.done(this.props.todoList, []);
  }

  handleRecover(index) {
    const todoList = [...this.props.todoList];
    const completedList = [...this.props.completedList];
    todoList.push(completedList[index]);
    completedList.splice(index, 1);
    this.props.done(todoList, completedList);
  }

  handleDelete(index) {
    const completedList = [...this.props.completedList];
    completedList.splice(index, 1);
    this.props.done(this.props.todoList, completedList);
  }

  getCompletedItems() {
    return (
      this.props.completedList.map((item, index) => {
        return (
          <CompletedItem 
            key={index} 
            content={item} 
            index={index}
            recover={this.handleRecover}
            delete={this.handleDelete}
          />
        );
      })
    )
  }
  
  render() {
    let btn = null;
    if (this.props.completedList.length > 1) {
      btn = (
        <div className='subFooter'>
          <button className='btn' onClick={this.handleClearCompleted}>Clear</button>
        </div>
      )
    }

    return(
      <Fragment>
        <div className='subHeader'>
          <h1>Completed</h1>
          <div className='nums'>{this.props.completedList.length}</div>
        </div>
        <ul>{this.getCompletedItems()}</ul>
        {btn}
      </Fragment>
    )
  }
}

export default Completed;