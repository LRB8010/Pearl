import React, { Component } from "react"
import TopBar from "./TopBar"
import TaskList from "./TaskList"
import ShowTask from "./ShowTask"
import Pearl2 from "./Pearl2.png"


class ContentContainer extends Component{

    addToPending = (e) => {
        e.preventDefault()
        if (JSON.parse(localStorage.getItem("pending")).some(e => e.task_id === this.props.selectedTask[0].id)){
            console.log("You already volunteerd")
        } else{
         const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                pending:{
                task_id: this.props.selectedTask[0].id,
                volunteer_id: localStorage.id,
                senior_id: this.props.selectedTask[0].user.id
            }
            })
        }
    
        fetch("http://localhost:3001/pending",options)
        .then(res => res.json())
        .then(console.log)
        this.props.closeShowTask()

    }
}
    
    

    render(){
        return(
            <div>
                 <img className="logo" src={Pearl2} height="100" />
                <TopBar 
                history={this.props.history} 
                loggedIn={this.props.loggedIn} 
                currentUser={this.props.currentUser} 
                logOut={this.props.logOut}
                getPending={this.props.getPending}
                createdTasks={this.props.createdTasks}
                getInProgress={this.props.getInProgress}/>

                

                <ShowTask  
                history={this.props.history}
                selectedTask={this.props.selectedTask}
                deleteTask={this.props.deleteTask}
                forceRender={this.props.forceRender}
                addToPending={this.addToPending}/>

                <TaskList
                tasks={this.props.tasks}
                selectTask={this.props.selectTask}
               />
            </div>
        )
    }
}

export default ContentContainer