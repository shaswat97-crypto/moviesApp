import React, { Component } from 'react'

export default class Todo extends Component {
    constructor() {
        super()
        this.state = {
            tasks: [
                {
                    task: "homework",
                    id: 1
                },
                {
                    task: "workout",
                    id: 2
                },
                {
                    task: "cook food",
                    id: 3
                }
            ],
            currTask: ''
        }
    }

    handleChange = (e)=>{
        this.setState({
            currTask:e.target.value
        })
        // console.log(this.state.currTask);
    }

    handleClick = () =>{
        this.setState({
            tasks:[...this.state.tasks, {
                task:this.state.currTask,
                id:this.state.tasks.length+1
            }]
        })
        this.setState({
            currTask:""
        })
    }

    handleDelete = (id) =>{
        this.setState({
            tasks:this.state.tasks.filter((stateObj)=>(
                id != stateObj.id
            ))
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.currTask} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>
                <ul>
                {
                    this.state.tasks.map((taskObj)=>(
                        <li key={taskObj.id}>
                            <div>{taskObj.task}</div>
                            <button onClick={()=>this.handleDelete(taskObj.id)}>Delete</button>
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }
}
