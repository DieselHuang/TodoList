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
  
  // 完成单个item
  handleComplete() {
    this.props.complete(this.props.index);
  }

  // 删除单个item
  handleDelete() {
    this.props.delete(this.props.index);
  }

  // 双击修改
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

  // 按下enter完成修改，按下esc取消修改
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

  // 失去焦点完成修改
  handleBlur() {
    if (this.state.isEsc) {
      this.setState({
        isEsc: false
      })
    } else {
      this.itemEditDone();
    }
  }

  // 修改完成更新视图
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
          {/* 检测网址并显示 */}
          {/* hidden属性控制div在修改状态时隐藏 */}
          <div 
            dangerouslySetInnerHTML={{__html: content}}
            id='content' 
            hidden={this.state.isEdit} 
            onDoubleClick={this.handleEdit}
          />
          <button id='dlt' onClick={this.handleDelete}><img id='dltBtn' src={deleteBtn} alt='delete' /></button>
        </div>
        {/* 双击时实际的输入框 */}
        {/* hidden属性控制input在非修改状态时隐藏 */}
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