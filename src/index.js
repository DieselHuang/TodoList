import React from 'react'; //让浏览器可以理解组件的语法
import ReactDOM from 'react-dom'; //将组件挂在到DOM的节点上

//App就是App.js，就是一个组件，大写字母开头就是一个组件
import TodoList from './TodoList'; 

ReactDOM.render(<TodoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

