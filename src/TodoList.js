import React, { Component, Fragment } from 'react';
import Todos from './Todos';
import Completed from './Completed';

import './TodoList.css';

//定义一个React组件
class TodotodoList extends Component { //一个类就是一个组件，必须继承React.Component
  
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      completedList: [],
      inputValue: '',
      tips:'Add Todo Item Here...'
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
    this.updateView = this.updateView.bind(this);
  } 

  handleClick() {
    this.setState({
      tips: ''
    });
  }

  handleBlur() {
    this.setState({
      tips: 'Add Todo Item Here...'
    });
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
    value = replaceURLWithHTMLLinks(value);
    console.log(value);
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
    let todos = null;
    let cmplt = null;

    if (this.state.todoList.length) {
      todos = (<Todos todoList={this.state.todoList} completedList={this.state.completedList} done={this.updateView}/>);
    }
    if (this.state.completedList.length) {
      cmplt = (<Completed todoList={this.state.todoList} completedList={this.state.completedList} done={this.updateView}/>);
    }
    
    return ( //组件显示的内容
      <Fragment>
        <div id='header'>
          <div id='title'>Diesel's TodoList</div>
          <input 
            id='input'
            placeholder={this.state.tips}
            value={this.state.inputValue} 
            onClick={this.handleClick} 
            onBlur={this.handleBlur}
            onChange={this.handleInputChange} 
            onKeyDown = {this.handleKeyDownPost}
          />
        </div>
        
        <div id='main'>
          {todos}
          {cmplt}
        </div>

        <div id='footer'>
          Copyright © Diesel
        </div>
      </Fragment>
    );
  }

}

function replaceURLWithHTMLLinks(text) {
  let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1'>$1</a>"); 
}

export default TodotodoList; //export之后，App才能被index.js import 