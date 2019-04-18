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

  // 一键完成
  handleCompleteAll() {
    const todoList = [...this.props.todoList];
    let completedList = [...this.props.completedList];
    completedList = completedList.concat(todoList);
    this.props.done([], completedList)
  }

  // 一键删除
  handleDeleteAll() {
    this.props.done([], this.props.completedList)
  }

  // 删除单个item
  handleDelete(index) {
    const todoList = [...this.props.todoList];
    todoList.splice(index, 1);
    this.props.done(todoList, this.props.completedList)
  }

  // 完成单个item
  handleComplete(index) {
    const todoList = [...this.props.todoList];
    const completedList = [...this.props.completedList];
    completedList.push(todoList[index]);
    todoList.splice(index, 1);
    this.props.done(todoList, completedList)
  }
  
  // 渲染todos列表
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

  // 传递给组件TodoItem，双击修改后更新视图
  itemEditDone(value, index) {
    const todoList = [...this.props.todoList];
    todoList[index] = value;
    this.props.done(todoList, this.props.completedList)
  }
  
  render() {
    // 实现一键删除/完成的动态显示，内容大于两个时显示
    let btn = null;
    if (this.props.todoList.length > 1) {
      btn = (
        <div className='subFooter'>
          <button className='btn' onClick={this.handleCompleteAll}>Complete All</button>
          <button className='btn' onClick={this.handleDeleteAll}>Delete All</button>
        </div>
      )
    }

    return(
      <Fragment>
        <div className='subHeader'>
          <h1 id='todosTitle'>Todos</h1>
          <div className='nums'>{this.props.todoList.length}</div>
        </div>
        <ul>{this.getTodoItems()}</ul>
        {btn}
      </Fragment>
    )
  }
}

export default Todos;