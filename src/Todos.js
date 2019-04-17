import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {
  constructor(props) {
    super(props);

    this.handleCompleteAll = this.handleCompleteAll.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.itemEditDone = this.itemEditDone.bind(this);
  }

  handleCompleteAll() {
    const todoList = [...this.props.todoList];
    let completedList = [...this.props.completedList];
    completedList = completedList.concat(todoList);
    this.props.done(todoList, completedList)
  }

  handleDeleteAll() {
    this.props.done([], this.props.completedList)
  }

  handleDelete(index) {
    const todoList = [...this.props.todoList];
    todoList.splice(index, 1);
    this.props.done(todoList, this.props.completedList)
  }

  handleComplete(index) {
    const todoList = [...this.props.todoList];
    const completedList = [...this.props.completedList];
    completedList.push(todoList[index]);
    todoList.splice(index, 1);
    this.props.done(todoList, completedList)
  }
  
  getTodoItems() {
    return (
      this.props.todoList.map((item, index) => {
        return (
          <TodoItem 
            key={index} 
            delete={this.handleDelete} 
            complete={this.handleComplete}
            content={item} 
            index={index}
            done={this.itemEditDone}
          />
        );
      })
    )
  }

  itemEditDone(value, index) {
    const todoList = [...this.props.todoList];
    todoList[index] = value;
    this.props.done(todoList, this.props.completedList)
  }
  
  render() {
    return(
      <Fragment>
        <div hidden={this.props.todoList.length>1}>{this.props.todoList.length} item left</div>
        <div hidden={this.props.todoList.length<2}>{this.props.todoList.length} items left</div>
        <div>Todos</div>
        <button onClick={this.handleCompleteAll}>Complete All</button>
        <button onClick={this.handleDeleteAll}>Delete All</button>
        <ul>{this.getTodoItems()}</ul>
      </Fragment>
    )
  }
}

export default Todos;