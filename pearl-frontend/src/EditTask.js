import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"


class EditTask extends Component{
    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                task:{
                task: this.state.task,
                destination: this.state.destination,
                description: this.state.description,
                user_id: localStorage.id
                }
            })
        }
        fetch(`http://localhost:3001/tasks/${this.props.selectedTask[0].id}`,options)
        .then(res => res.json())
        .then(task => {
          this.props.addEditedTask(task.id,task)
          
        })
        
        this.props.history.push('/')
    }

    
    


    render(){
        return(
            <div style={{width: "100%",marginTop: "10%",textAlign: "center"}}>
            <form className="center">
            <img  src={Pearl2} height="100" /> <br/><br/> <br/>
        <TextField className="block" name="task" required defaultValue={this.props.selectedTask[0].task} variant="outlined" label="Task" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
        <TextField className="block" name="destination" required defaultValue={this.props.selectedTask[0].destination} variant="outlined" label="Destination"  onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
        <TextField className="block" name="description" required defaultValue={this.props.selectedTask[0].description} variant="outlined" label="Description" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
        <Button variant="contained" color="primary" type="submit" value="Create Task" onClick={(e) => {this.handleSubmit(e)}}>Edit Task</Button>
            {/* // <div>
            //     <form >
            //         <label>Task</label>
            //         <input name="task" defaultValue={this.props.selectedTask[0].task} onChange={(e) => this.handleChange(e)}/>
            //         <label>Destination</label>
            //         <input name="destination" defaultValue={this.props.selectedTask[0].destination} onChange={(e) => this.handleChange(e)}/>
            //         <label>Description</label>
            //         <input name="description" defaultValue={this.props.selectedTask[0].description} onChange={(e) => this.handleChange(e)}/>
            //         <input type="submit" value="Edit Task" onClick={(e) => this.handleSubmit(e)}/> */}
                 </form>

            </div>
        )
    }
}
export default EditTask