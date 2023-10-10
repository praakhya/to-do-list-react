import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';
import { toDoContext } from './toDoContext';

class ToDoList extends Component {
  static contextType = toDoContext;

    constructor(props) {
        super();
//        const context = this.context;
        //It will get the data from context, and put it into the state.
  //      this.setState({ toDoData: context.toDoData });
    
    //    this.getToDo = this.getToDo.bind(this)
      //  this.initToDoData = this.initToDoData.bind(this)
        //this.setItemList = this.setItemList.bind(this)
    }  
    getToDo() {
        console.log("in get ToDo");
        var baseUrl = "/api";
        axios.get(baseUrl+'/load/todo')
        .then(response => {
          if (response.status != 200) {
            throw new Error(response.message);
          }
          return response.data})
        .then(data=>{
          console.log("data: ",data)
          this.setItemList(data) 
        })
        .catch((err) => {
          console.log(err);
        });
    }
    initToDoData(data){
      console.log("init data: ",data)
      const context = this.context;
      context.setToDoData(data)
      console.log("toDo state var: ",data, context)
    }
    setItemList(response) {
      var temp = []
      for (let todo of response) {
        temp.push({
          "title":todo.title,
          "description":todo.description,
          "done":todo.done,
          "_id":todo._id
        })
      }
      console.log("immediated response: ",response)
      this.initToDoData(temp)
      console.log("context var: ",this.context)
    }
    componentDidMount() {
      console.log("before getToDo")
      this.getToDo()
      console.log("ToDoList mounted")
    }
    render() {
          var itemList = []
          for (let todo of this.context.toDoData){
            console.log("TODOLIST: todo done: ",todo.done, "default done: ",this.props.defaultDone)
            if (todo.done==this.props.defaultDone)
              itemList.push(<ToDoItem todo={todo} disabled={this.props.disabled} defaultDone={this.props.defaultDone}/>)
          }
          console.log("itemList: ",this.props.defaultDone,itemList)
          return (
              <div className="scrollable">
              {itemList}
              </div>
          );
        
    }
  }

ToDoList.contextType = toDoContext
export default ToDoList