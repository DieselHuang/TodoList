import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'
import CompletedItem from './CompletedItem'

//定义一个React组件
class TodotodoList extends Component { //一个类就是一个组件，必须继承React.Component
  
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      completedList: [],
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  } 
  
  handleBtnClick() {
    this.setState({
      todoList: [...this.state.todoList, this.state.inputValue],
      inputValue: ''
    });
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleDelete(index) {
    const todoList = [...this.state.todoList];
    todoList.splice(index, 1);
    this.setState({todoList});
  }

  handleComplete(index) {
    const todoList = [...this.state.todoList];
    const completedList = [...this.state.completedList];
    completedList.push(todoList[index]);
    todoList.splice(index, 1);
    this.setState({
      todoList,
      completedList
    })
  }

  getTodoItems() {
    return (
      this.state.todoList.map((item, index) => {
        return (
          <TodoItem 
            delete={this.handleDelete} 
            complete={this.handleComplete}
            key={index} 
            content={item} 
            index={index}
          />
        );
      })
    )
  }

  getCompletedItems() {
    return (
      this.state.completedList.map((item, index) => {
        return (
          <CompletedItem 
            key={index} 
            content={item} 
            index={index}
          />
        );
      })
    )
  }

  render() { //必须有render函数
    //JSX语法，可以直接在React里面使用标签，也可以在{}里面写JS的表达式，但是不能写语句
    return ( //组件显示的内容
      <Fragment>
        <div>
          <input value={this.state.inputValue} onChange={this.handleInputChange}/>
          <button onClick={this.handleBtnClick}>add</button>
        </div>
        <div>{this.state.todoList.length} item left</div>
        <div>Todos</div>
        <ul>{this.getTodoItems()}</ul>
        <div>Completed</div>
        <ul>{this.getCompletedItems()}</ul>
      </Fragment>
    );
  }

}

export default TodotodoList; //export之后，App才能被index.js import 