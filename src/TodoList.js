import React, { Component, Fragment } from 'react';
import Todos from './Todos';
import Completed from './Completed';

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
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
    this.updateView = this.updateView.bind(this);
  } 

  handleKeyDownPost(e) {
    if (e.keyCode !== 13) {
      return;
    }
    let value  = e.target.value.trim();
    if (value === '') {
      this.setState({
        inputValue: ''
      });
      return;
    }
    this.setState({
      todoList: [...this.state.todoList, value],
      inputValue: ''
    });
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  updateView(todo, completed) {
    this.setState({
      todoList: todo,
      completedList: completed
    })
  }

  render() { //必须有render函数
    //JSX语法，可以直接在React里面使用标签，也可以在{}里面写JS的表达式，但是不能写语句
    return ( //组件显示的内容
      <Fragment>
        <div>
          <div>Diesel's TodoList</div>
          <input value={this.state.inputValue} onChange={this.handleInputChange} onKeyDown = {this.handleKeyDownPost}/>
        </div>

        <Todos todoList={this.state.todoList} completedList={this.state.completedList} done={this.updateView}/>
        <Completed todoList={this.state.todoList} completedList={this.state.completedList} done={this.updateView}/>
      </Fragment>
    );
  }

}

export default TodotodoList; //export之后，App才能被index.js import 