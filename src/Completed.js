import React, { Component, Fragment } from 'react';
import CompletedItem from './CompletedItem'

class Completed extends Component {
  constructor(props) {
    super(props);

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleRecover = this.handleRecover.bind(this);
  }
  
  handleClearCompleted() {
    this.props.done(this.props.todoList, [])
  }

  handleRecover(index) {
    const todoList = [...this.props.todoList];
    const completedList = [...this.props.completedList];
    todoList.push(completedList[index]);
    completedList.splice(index, 1);
    this.props.done(todoList, completedList)
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
          />
        );
      })
    )
  }
  
  render() {
    return(
      <Fragment>
        <div>Completed</div>
        <button onClick={this.handleClearCompleted}>Clear</button>
        <ul>{this.getCompletedItems()}</ul>
      </Fragment>
    )
  }
}

export default Completed;